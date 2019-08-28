<?php

ini_set('display_errors', 'on');

header('Content-type: text/html; charset=utf-8');

?>

<!DOCTYPE>
<html>

<body>

<?php

$errrs = [false];

$postkeys = ["key", "msg", "enorde"];
$postvalues = [];

foreach ($postkeys as $key => $value) {
    if (isset($_POST[$value])) {
        $postvalues[$value] = $_POST[$value];
    } else {
        $errrs[0] = true;
        return false;
    }
}

//print_r($postkeys);
//echo "<br>\n";
//print_r($postvalues);

if (!$errrs[0]) {
    $key = escapeshellarg($postvalues["key"]);
    $msg = escapeshellarg($postvalues["msg"]);
    $enorde = escapeshellarg($postvalues["enorde"]);

    $command = "python3 oskarscryptormod.py $key $msg $enorde";

    echo "<br>\n<code>" . $command . "</code>";

    $buffer = 'empty buffer';
    ob_start();
    passthru($command);

    $buffer = ob_get_contents();
    ob_end_clean();

    $re = '/\'HIER\', b\'(.+)\', \'DA\', /';
    $subst = '\'$1\', ';
    // $result = preg_replace($re, $subst, $buffer, 1);
    $result = preg_replace_callback(
        $re,
        function($m) {
            $rtrn = base64_decode($m[1]);
            return "'" . $rtrn . "', ";
        },
        $buffer
    );

    echo "<br>\n", $result;
} else {
    echo "error 1";
}

?>

</body>

</html>
