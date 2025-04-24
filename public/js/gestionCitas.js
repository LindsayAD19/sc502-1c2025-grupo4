<?php
session_start();
include(__DIR__ . '/../../config/database.php');

$action = $_GET['action'] ?? null;

// Obtener listado de citas del paciente logueado
if ($action === 'listCitas' && isset($_SESSION['usuario_id'])) {
    $idPaciente = $_SESSION['usuario_id'];

    $sql = "SELECT 
                c.FECHA, 
                c.HORA, 
                u.nombre AS nombre_terapeuta,
                u.apellidos AS apellidos_terapeuta
            FROM cita c
            JOIN usuarios_tb u ON c.ID_TERAPEUTA = u.id
            WHERE c.ID_PACIENTE = ?
            ORDER BY c.FECHA, c.HORA";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idPaciente);
    $stmt->execute();
    $result = $stmt->get_result();

    $citas = [];
    while ($row = $result->fetch_assoc()) {
        $citas[] = [
            'fecha' => $row['FECHA'],
            'hora' => $row['HORA'],
            'terapeuta' => $row['nombre_terapeuta'] . ' ' . $row['apellidos_terapeuta']
        ];
    }

    echo json_encode($citas);
    exit;
}

// Obtener precio del terapeuta por ID
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT precio FROM terapeuta_terapia WHERE id_terapeuta = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        error_log("Precio encontrado: " . $row['precio']);
        echo json_encode(['precio' => $row['precio']]);
    } else {
        echo json_encode(['precio' => 'No disponible']);
    }
    exit;
}

// Obtener listado de terapeutas
$sql = "SELECT id, nombre FROM usuarios_tb WHERE tipo = 'terapeuta'"; 
$result = $conn->query($sql);

$terapeutas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $terapeutas[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($terapeutas);
