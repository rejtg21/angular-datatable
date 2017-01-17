<?php
$data = [];
// $data['data'][] 
$data = [
    'fname' => 'Rej',
    'mname' => 'Silva',
    'lname' => 'Mediodia',
    'action' => '<button class="btn btn-warning" rdt-search title = "Search">
                <span class = "glyphicon glyphicon-search"></span>
            </button>
            <button class="btn btn-danger" rdt-reset title = "Reset">
                <span class = "glyphicon glyphicon-repeat"></span>
            </button>'
];

echo json_encode($data);
