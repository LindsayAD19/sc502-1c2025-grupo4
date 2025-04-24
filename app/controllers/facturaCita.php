<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

$idPago = isset($_GET['idPago']) ? intval($_GET['idPago']) : 0;
if ($idPago <= 0) {
    echo json_encode(['success' => false, 'mensaje' => 'ID de pago inválido']);
    exit;
}

$sql = "
SELECT 
    p.FECHA_PAGO,
    p.METODO_PAGO,
    p.TOTAL,
    c.FECHA AS FECHA_CITA,
    c.HORA AS HORA_CITA,
    pac.nombre AS nombre_paciente,
    pac.apellidos AS apellidos_paciente,
    ter.nombre AS nombre_terapeuta,
    ter.apellidos AS apellidos_terapeuta,
    t.especialidad AS descripcion_terapia
FROM pago p
JOIN cita c ON p.ID_CITA = c.ID_CITA
JOIN usuarios_tb pac ON c.ID_PACIENTE = pac.id
JOIN usuarios_tb ter ON c.ID_TERAPEUTA = ter.id
JOIN terapia t ON p.ID_TERAPIA = t.ID_TERAPIA
WHERE p.ID_PAGO = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $idPago);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

if (!$data) {
    echo json_encode(['success' => false, 'mensaje' => 'Factura no encontrada']);
    exit;
}

echo json_encode(['success' => true, 'factura' => $data]);
