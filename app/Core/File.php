<?php


namespace App\Core;


use Illuminate\Http\UploadedFile;

class File
{

    protected $file;

    protected $moduleName;

    protected $disk;

    protected $uploadDirectoryName;

    public function __construct(UploadedFile $file, string $uploadDirectoryName, $disk = 'pc_public')
    {
        $this->file = $file;
        $this->disk = $disk;
        $this->uploadDirectoryName = $uploadDirectoryName;
    }

    public function save()
    {
        return $this->file->storeAs($this->uploadDirectoryName, $this->file->getClientOriginalName(), $this->disk);
    }

    public function getOriginalFile()
    {
        return $this->file;
    }

//    public function isImageType()
//    {
//        $mimeType = $this->file->getMimeType();
//        return (bool)preg_match('/image/', $mimeType);
//    }

    public function isDocumentType()
    {
        return false;
    }

    public function isAudioType()
    {
        return false;
    }

    public function isVideoType()
    {
        return false;
    }
}
