export function GetFormattedStorageUnits(amountInBytes) {
  let amountInBytesInt = parseInt(amountInBytes);
  if (amountInBytesInt < 10 ** 3) {
    return `${(amountInBytesInt / 10 ** 0).toFixed(2)} B`;
  } else if (amountInBytesInt < 10 ** 6) {
    return `${(amountInBytesInt / 10 ** 3).toFixed(2)} KB`;
  } else if (amountInBytesInt < 10 ** 9) {
    return `${(amountInBytesInt / 10 ** 6).toFixed(2)} MB`;
  } else if (amountInBytesInt < 10 ** 12) {
    return `${(amountInBytesInt / 10 ** 9).toFixed(2)} GB`;
  } else if (amountInBytesInt < 10 ** 15) {
    return `${(amountInBytesInt / 10 ** 12).toFixed(2)} TB`;
  } else if (amountInBytesInt < 10 ** 18) {
    return `${(amountInBytesInt / 10 ** 15).toFixed(2)} PB`;
  } else if (amountInBytesInt < 10 ** 21) {
    return `${(amountInBytesInt / 10 ** 18).toFixed(2)} EB`;
  } else if (amountInBytesInt < 10 ** 24) {
    return `${(amountInBytesInt / 10 ** 21).toFixed(2)} ZB`;
  } else {
    return `${(amountInBytesInt / 10 ** 24).toFixed(2)} YB`;
  }
}

export function GetFormattedFILUnits(amountInAttoFIL) {
  // ⨎
  // 1attoFIL=10^-18FIL
  //console.log("amountInAttoFIL", amountInAttoFIL);
  let amountInAttoFILInt = amountInAttoFIL; // parseInt(amountInAttoFIL);
  console.log("amountInAttoFILInt", amountInAttoFILInt);
  if (amountInAttoFILInt == 0) {
    return `0 FIL`;
  }
  if (amountInAttoFILInt < 10 ** 3) {
    return `${(amountInAttoFILInt / 10 ** 0).toFixed(2)} attoFIL`; // <=999attoFIL
  } else if (amountInAttoFILInt < 10 ** 6) {
    return `${(amountInAttoFILInt / 10 ** 3).toFixed(2)} femtoFIL`; // 1femtoFIL to 999femtoFIL
  } else if (amountInAttoFILInt < 10 ** 9) {
    return `${(amountInAttoFILInt / 10 ** 6).toFixed(2)} picoFIL`; // 1picoFIL to 999picoFIL
  } else if (amountInAttoFILInt < 10 ** 12) {
    return `${(amountInAttoFILInt / 10 ** 9).toFixed(2)} nanoFIL`; // 1nanoFIL to 999nanoFIL
  } else if (amountInAttoFILInt < 10 ** 15) {
    return `${(amountInAttoFILInt / 10 ** 12).toFixed(2)} microFIL`; // 1microFIL to 999microFIL
  } else if (amountInAttoFILInt < 10 ** 18) {
    return `${(amountInAttoFILInt / 10 ** 15).toFixed(2)} milliFIL`; // 1 milliFIL to 999milliFIL
  } else if (amountInAttoFILInt < 10 ** 21) {
    return `${(amountInAttoFILInt / 10 ** 18).toFixed(2)} FIL`; // 1FIL to 999FIL
  } else if (amountInAttoFILInt < 10 ** 24) {
    return `${(amountInAttoFILInt / 10 ** 21).toFixed(2)} kiloFIL`; // 1kiloFIL to 999kiloFIL
  } else if (amountInAttoFILInt < 10 ** 27) {
    return `${(amountInAttoFILInt / 10 ** 24).toFixed(2)} megaFIL`; // 1megaFIL to 999megaFIL
  } else {
    return `${(amountInAttoFILInt / 10 ** 27).toFixed(2)} gigaFIL`; // >=1gigaFIL
  }
}

export function GetSimpleFILUnits(amountInAttoFIL) {
  // ⨎
  let amountInFIL = amountInAttoFIL / 10 ** 18;
  let sign = "";
  if (amountInFIL < 0) {
    sign = "-";
  }
  if (Math.abs(amountInFIL) < 0.0001) {
    return `0 FIL`;
  } else if (Math.abs(amountInFIL) < 1000) {
    if (sign == "-") return sign + `${Math.abs(amountInFIL).toFixed(2)} FIL`;
    return `${amountInFIL.toFixed(2)} FIL`;
  } else if (Math.abs(amountInFIL) < 1000000) {
    if (sign == "-")
      return sign + `${Math.abs(amountInFIL / 1000).toFixed(2)} FIL`;
    return `${(amountInFIL / 1000).toFixed(2)}K FIL`;
  } else if (Math.abs(amountInFIL) < 1000000000) {
    if (sign == "-")
      return sign + `${Math.abs(amountInFIL / 1000000).toFixed(2)} FIL`;
    return `${(amountInFIL / 1000000).toFixed(2)}M FIL`;
  } else {
    if (sign == "-")
      return sign + `${Math.abs(amountInFIL / 1000000000).toFixed(2)} FIL`;
    return `${(amountInFIL / 1000000000).toFixed(2)}B FIL`;
  }
}

export function GetSimpleUSDUnits(amountInUSD) {
  console.log("amountInUSD", amountInUSD);
  if (amountInUSD < 0.01) {
    return `$0`;
  } else if (amountInUSD < 1000) {
    return `$${amountInUSD.toFixed(2)}`;
  } else if (amountInUSD < 1000000) {
    return `$${(amountInUSD / 1000).toFixed(2)}K`;
  } else if (amountInUSD < 1000000000) {
    return `$${(amountInUSD / 1000000).toFixed(2)}M`;
  } else if (amountInUSD < 1000000000000) {
    return `$${(amountInUSD / 1000000000).toFixed(2)}B`;
  } else {
    return `$${(amountInUSD / 1000000000000).toFixed(2)}T`;
  }
}
