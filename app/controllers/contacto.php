<?php 
include(__DIR__ . '/../../config/database.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!$conn) {
        echo json_encode(['success' => false, 'mensaje' => 'Error de conexión a la base de datos']);
        exit;
    }

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $sexo = $_POST['sexo'];
    $mensaje = $_POST['mensaje'];

    if (empty($nombre) || empty($apellido) || empty($correo) || empty($sexo) || empty($mensaje)) {
        echo json_encode(['success' => false, 'mensaje' => 'Todos los campos son requeridos']);
        exit;
    }

    $sql = "INSERT INTO contacto (nombre, apellido, correo, sexo, mensaje) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
         echo json_encode([
        'success' => false,
        'mensaje' => 'Error al preparar la consulta: ' . $conn->error
    ]);
        exit;
    }

    $stmt->bind_param("sssss", $nombre, $apellido, $correo, $sexo, $mensaje);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'mensaje' => 'Mensaje enviado correctamente']);
    } else {
        echo json_encode(['success' => false, 'mensaje' => 'Error al enviar el mensaje: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
