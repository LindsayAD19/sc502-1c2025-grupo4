<?php
header('Content-Type: application/json');
session_start();
require_once '../../config/database.php';

// 1) Verificar sesión
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['success' => false, 'mensaje' => 'Debe iniciar sesión']);
    exit;
}
$userId = $_SESSION['usuario_id'];

// 2) Leer datos de $_POST
$fecha       = $_POST['fecha']       ?? null;
$hora        = $_POST['hora']        ?? null;
$idTerapeuta = intval($_POST['idTerapeuta'] ?? 0);
$precio      = floatval($_POST['precio'] ?? 0);
$metodo      = $_POST['metodo']      ?? '';

// 3) Validar campos obligatorios
$required = ['fecha','hora','idTerapeuta','precio','metodo'];
foreach ($required as $f) {
    if (!isset($_POST[$f]) || $_POST[$f] === '') {
        echo json_encode(['success' => false, 'mensaje' => "Campo $f faltante"]);
        exit;
    }
}

// 4) Insertar en transacción
$conn->autocommit(false);
try {
    // Insertar en CITA
    $stmt = $conn->prepare("
        INSERT INTO cita (FECHA, HORA, ID_PACIENTE, ID_TERAPEUTA)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->bind_param('ssii', $fecha, $hora, $userId, $idTerapeuta);
    $stmt->execute();
    $idCita = $conn->insert_id;

    // Obtener ID_TERAPIA
    $stmt = $conn->prepare("
        SELECT ID_TERAPIA
        FROM terapeuta_terapia
        WHERE ID_TERAPEUTA = ?
        LIMIT 1
    ");
    $stmt->bind_param('i', $idTerapeuta);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    $idTerapia = $row['ID_TERAPIA'] ?? 0;

    // Insertar en PAGO
    $stmt = $conn->prepare("
        INSERT INTO pago (METODO_PAGO, ID_CITA, ID_TERAPIA, TOTAL)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->bind_param('siid', $metodo, $idCita, $idTerapia, $precio);
    $stmt->execute();
    $idPago = $conn->insert_id;

    $conn->commit();
    echo json_encode(['success' => true, 'idPago' => $idPago]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'mensaje' => $e->getMessage()]);
}
