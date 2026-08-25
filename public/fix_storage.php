<?php

function perms($dir){
foreach(glob($dir.'/*') as $file){

if(is_dir($file)){
chmod($file,0755);
perms($file);
}else{
chmod($file,0644);
}

}
}

perms(__DIR__.'/storage');

echo "Done";

?>