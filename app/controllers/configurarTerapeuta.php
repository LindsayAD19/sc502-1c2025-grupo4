<?php
header('Content-Type: application/json');
session_start();
require_once '../../config/database.php';

// ID del terapeuta desde sesión
$idTerapeuta = $_SESSION['usuario_id'] ?? null;

// Determinar acción (POST form, GET query o JSON post)
$action = '';
if (isset($_POST['action'])) {
    $action = $_POST['action'];
} elseif (isset($_GET['action'])) {
    $action = $_GET['action'];
} else {
    $raw = file_get_contents('php://input');
    $json = json_decode($raw, true);
    $action = $json['action'] ?? '';
}

switch ($action) {
    case 'listTerapias':
        listTerapias($conn);
        break;
    case 'getConfig':
        getConfig($conn, $idTerapeuta);
        break;
    case 'saveConfig':
        $data = $json ?? [];
        saveConfig($conn, $idTerapeuta, $data);
        break;
    default:
        echo json_encode(['success' => false, 'mensaje' => 'Acción inválida']);
        break;
}

function listTerapias($conn) {
    $result = $conn->query("SELECT ID_TERAPIA, ESPECIALIDAD FROM TERAPIA");
    $output = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $output[] = $row;
        }
    }
    echo json_encode($output);
}

function getConfig($conn, $idTer) {
    $config = ['ID_TERAPIA' => null, 'PRECIO' => null, 'horarios' => []];
    if ($idTer) {
        $stmt = $conn->prepare(
            "SELECT ID_TERAPIA, PRECIO FROM TERAPEUTA_TERAPIA WHERE ID_TERAPEUTA = ? LIMIT 1"
        );
        $stmt->bind_param('i', $idTer);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_assoc();
        if ($res) {
            $config['ID_TERAPIA'] = $res['ID_TERAPIA'];
            $config['PRECIO'] = $res['PRECIO'];
        }
        $stmt = $conn->prepare(
            "SELECT DIA AS dia, HORA_INICIO AS hora_inicio, HORA_FIN AS hora_fin
             FROM TERAPEUTA_HORARIO WHERE ID_TERAPEUTA = ?"
        );
        $stmt->bind_param('i', $idTer);
        $stmt->execute();
        $hor = $stmt->get_result();
        while ($row = $hor->fetch_assoc()) {
            $config['horarios'][] = $row;
        }
    }
    echo json_encode($config);
}

function saveConfig($conn, $idTer, $data) {
    $response = ['success' => false, 'mensaje' => ''];
    if (!$idTer) {
        $response['mensaje'] = 'Sesión no iniciada';
        echo json_encode($response);
        return;
    }
    $conn->autocommit(false);
    try {
        // Verificar si ya existe registro para este terapeuta
        $check = $conn->prepare("SELECT COUNT(*) AS cnt FROM TERAPEUTA_TERAPIA WHERE ID_TERAPEUTA = ?");
        $check->bind_param('i', $idTer);
        $check->execute();
        $cnt = $check->get_result()->fetch_assoc()['cnt'];
        if ($cnt > 0) {
            // Actualizar registro existente
            $stmt = $conn->prepare(
                "UPDATE TERAPEUTA_TERAPIA SET ID_TERAPIA = ?, PRECIO = ? WHERE ID_TERAPEUTA = ?"
            );
            $stmt->bind_param('idi', $data['idTerapia'], $data['precio'], $idTer);
        } else {
            // Insertar nuevo registro
            $stmt = $conn->prepare(
                "INSERT INTO TERAPEUTA_TERAPIA (ID_TERAPEUTA, ID_TERAPIA, PRECIO) VALUES (?, ?, ?)"
            );
            $stmt->bind_param('iid', $idTer, $data['idTerapia'], $data['precio']);
        }
        $stmt->execute();

        // Borrar horarios antiguos
        $del = $conn->prepare("DELETE FROM TERAPEUTA_HORARIO WHERE ID_TERAPEUTA = ?");
        $del->bind_param('i', $idTer);
        $del->execute();

        // Insertar nuevos horarios
        $ins = $conn->prepare(
            "INSERT INTO TERAPEUTA_HORARIO (ID_TERAPEUTA, DIA, HORA_INICIO, HORA_FIN)
             VALUES (?, ?, ?, ?)"
        );
        foreach ($data['horarios'] as $h) {
            $ins->bind_param('isss', $idTer, $h['dia'], $h['hora_inicio'], $h['hora_fin']);
            $ins->execute();
        }

        $conn->commit();
        $response['success'] = true;
    } catch (Exception $e) {
        $conn->rollback();
        $response['mensaje'] = $e->getMessage();
    }
    echo json_encode($response);
}