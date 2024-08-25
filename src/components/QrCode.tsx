import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QrCodeProps {
  text: string;
  width: number;
  height: number;
}

export default function QrCode ({
  text, width, height
}: QrCodeProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(canvasRef.current, text, {}, (error) => {
      if (error) console.error(error);
    });
  }, [text, width, height]);

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
};
