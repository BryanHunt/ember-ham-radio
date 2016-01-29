const magicNumber = [0x50, 0xBB, 0xFF, 0x20, 0x12, 0x07, 0x25];

export default function radiosUv5r(serialPort) {
  serialPort.open().then(() => {
    serialPort.write(magicNumber);
  });
}
