<?php
include(__DIR__ . '/../../config/database.php');

$sql = "SELECT a.id, a.nombre, a.apellidos, b.especialidad, b.descripcion, c.precio, d.dia, d.hora_inicio, d.hora_fin
        FROM usuarios_tb a
        JOIN terapeuta_terapia c ON c.id_terapeuta = a.id
        JOIN terapia b ON c.id_terapia = b.id_terapia
        JOIN terapeuta_horario d ON d.id_terapeuta = a.id
        WHERE a.tipo = 'terapeuta'";

$result = $conn->query($sql);

$terapeutas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $terapeutas[] = $row;
    }
} else {
    error_log("No se encontraron terapeutas.");
}

header('Content-Type: application/json');
echo json_encode($terapeutas);
?>
