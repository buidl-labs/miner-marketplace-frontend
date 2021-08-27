export function GetFormattedStorageUnits(amountInBytes) {
  const amountInBytesInt = parseInt(amountInBytes, 10);
  if (amountInBytesInt < 10 ** 3) {
    return `${(amountInBytesInt / 10 ** 0).toFixed(2)} B`;
  }
  if (amountInBytesInt < 10 ** 6) {
    return `${(amountInBytesInt / 10 ** 3).toFixed(2)} KB`;
  }
  if (amountInBytesInt < 10 ** 9) {
    return `${(amountInBytesInt / 10 ** 6).toFixed(2)} MB`;
  }
  if (amountInBytesInt < 10 ** 12) {
    return `${(amountInBytesInt / 10 ** 9).toFixed(2)} GB`;
  }
  if (amountInBytesInt < 10 ** 15) {
    return `${(amountInBytesInt / 10 ** 12).toFixed(2)} TB`;
  }
  if (amountInBytesInt < 10 ** 18) {
    return `${(amountInBytesInt / 10 ** 15).toFixed(2)} PB`;
  }
  if (amountInBytesInt < 10 ** 21) {
    return `${(amountInBytesInt / 10 ** 18).toFixed(2)} EB`;
  }
  if (amountInBytesInt < 10 ** 24) {
    return `${(amountInBytesInt / 10 ** 21).toFixed(2)} ZB`;
  }
  return `${(amountInBytesInt / 10 ** 24).toFixed(2)} YB`;
}

export function GetFormattedFILUnits(amountInAttoFIL) {
  // ⨎
  // 1attoFIL=10^-18FIL
  const amountInAttoFILInt = amountInAttoFIL; // parseInt(amountInAttoFIL);
  if (amountInAttoFILInt === 0) {
    return `0 FIL`;
  }
  if (amountInAttoFILInt < 10 ** 3) {
    return `${(amountInAttoFILInt / 10 ** 0).toFixed(2)} attoFIL`; // <=999attoFIL
  }
  if (amountInAttoFILInt < 10 ** 6) {
    return `${(amountInAttoFILInt / 10 ** 3).toFixed(2)} femtoFIL`; // 1femtoFIL to 999femtoFIL
  }
  if (amountInAttoFILInt < 10 ** 9) {
    return `${(amountInAttoFILInt / 10 ** 6).toFixed(2)} picoFIL`; // 1picoFIL to 999picoFIL
  }
  if (amountInAttoFILInt < 10 ** 12) {
    return `${(amountInAttoFILInt / 10 ** 9).toFixed(2)} nanoFIL`; // 1nanoFIL to 999nanoFIL
  }
  if (amountInAttoFILInt < 10 ** 15) {
    return `${(amountInAttoFILInt / 10 ** 12).toFixed(2)} microFIL`; // 1microFIL to 999microFIL
  }
  if (amountInAttoFILInt < 10 ** 18) {
    return `${(amountInAttoFILInt / 10 ** 15).toFixed(2)} milliFIL`; // 1 milliFIL to 999milliFIL
  }
  if (amountInAttoFILInt < 10 ** 21) {
    return `${(amountInAttoFILInt / 10 ** 18).toFixed(2)} FIL`; // 1FIL to 999FIL
  }
  if (amountInAttoFILInt < 10 ** 24) {
    return `${(amountInAttoFILInt / 10 ** 21).toFixed(2)} kiloFIL`; // 1kiloFIL to 999kiloFIL
  }
  if (amountInAttoFILInt < 10 ** 27) {
    return `${(amountInAttoFILInt / 10 ** 24).toFixed(2)} megaFIL`; // 1megaFIL to 999megaFIL
  }
  return `${(amountInAttoFILInt / 10 ** 27).toFixed(2)} gigaFIL`; // >=1gigaFIL
}

export function GetSimpleFILUnits(amountInAttoFIL) {
  // ⨎
  const amountInFIL = amountInAttoFIL / 10 ** 18;
  let sign = "";
  if (amountInFIL < 0) {
    sign = "-";
  }

  if (Math.abs(amountInFIL) < 0.0001) {
    return `0 FIL`;
  }
  if (Math.abs(amountInFIL) < 1000) {
    if (sign === "-") return `${sign}${Math.abs(amountInFIL).toFixed(2)} FIL`;
    return `${(amountInFIL / 1).toFixed(2)} FIL`;
  }
  if (Math.abs(amountInFIL) < 1000000) {
    if (sign === "-")
      return `${sign}${Math.abs(amountInFIL / 1000).toFixed(2)}K FIL`;
    return `${(amountInFIL / 1000).toFixed(2)}K FIL`;
  }
  if (Math.abs(amountInFIL) < 1000000000) {
    if (sign === "-")
      return `${sign}${Math.abs(amountInFIL / 1000000).toFixed(2)}M FIL`;
    return `${(amountInFIL / 1000000).toFixed(2)}M FIL`;
  }
  if (sign === "-")
    return `${sign}${Math.abs(amountInFIL / 1000000000).toFixed(2)}B FIL`;
  return `${(amountInFIL / 1000000000).toFixed(2)}B FIL`;
}

export function GetSimpleUSDUnits(amountInUSD) {
  let sign = "";
  if (amountInUSD < 0) {
    sign = "-";
  }
  if (Math.abs(amountInUSD) < 0.01) {
    return `$0`;
  }
  if (Math.abs(amountInUSD) < 1000) {
    if (sign === "-") return `${sign}$${Math.abs(amountInUSD).toFixed(2)}`;
    return `$${(amountInUSD / 1).toFixed(2)}`;
  }
  if (Math.abs(amountInUSD) < 1000000) {
    if (sign === "-")
      return `${sign}$${Math.abs(amountInUSD / 1000).toFixed(2)}K`;
    return `$${(amountInUSD / 1000).toFixed(2)}K`;
  }
  if (Math.abs(amountInUSD) < 1000000000) {
    if (sign === "-")
      return `${sign}$${Math.abs(amountInUSD / 1000000).toFixed(2)}M`;
    return `$${(amountInUSD / 1000000).toFixed(2)}M`;
  }
  if (Math.abs(amountInUSD) < 1000000000000) {
    if (sign === "-")
      return `${sign}$${Math.abs(amountInUSD / 1000000000).toFixed(2)}B`;
    return `$${(amountInUSD / 1000000000).toFixed(2)}B`;
  }
  if (sign === "-")
    return `${sign}$${Math.abs(amountInUSD / 1000000000000).toFixed(2)}T`;
  return `$${(amountInUSD / 1000000000000).toFixed(2)}T`;
}
