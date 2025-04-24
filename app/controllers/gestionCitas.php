<?php
include(__DIR__ . '/../../config/database.php');

$sql = "SELECT id, nombre FROM usuarios_tb WHERE tipo = 'terapeuta'"; 
$result = $conn->query($sql);

$terapeutas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $terapeutas[] = $row;
    }
}

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

$conn->close();

header('Content-Type: application/json');
echo json_encode($terapeutas);
