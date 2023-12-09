export const handleDownload = (blobData: Blob, fileName: string) => {
    // 创建 Blob 对象（这里使用示例文本）
    const blob = new Blob([blobData], { type: 'audio/mpeg' });

    // 创建 URL 对象
    const url = window.URL.createObjectURL(blob);

    // 创建一个虚拟链接并触发点击以下载
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // 指定文件名
    link.click();

    // 释放 URL 对象
    window.URL.revokeObjectURL(url);
  };