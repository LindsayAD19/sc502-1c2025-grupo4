<?php
session_start();
include '../../config/database.php';

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuario no logueado']);
    exit;
}

$idPaciente = $_SESSION['usuario_id'];

$sql = "
SELECT 
    C.ID_CITA,
    C.FECHA,
    C.HORA,
    U.NOMBRE AS nombre_terapeuta,
    S.PLATAFORMA
FROM CITA C
INNER JOIN usuarios_tb U ON C.ID_TERAPEUTA = U.id
LEFT JOIN SESION S ON C.ID_CITA = S.ID_CITA
WHERE C.ID_PACIENTE = ?
ORDER BY C.FECHA DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idPaciente);
$stmt->execute();
$result = $stmt->get_result();

$citas = [];

while ($row = $result->fetch_assoc()) {
    $citas[] = $row;
}

echo json_encode($citas);
?>