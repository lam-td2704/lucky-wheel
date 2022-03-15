/**
 * prizes
 * @param {*} prizes
 * @param {*} isPercentage
 * @returns
 */
export const randomIndex = (prizes, isPercentage = true) => {
  if (isPercentage) {
    let counter = 1;
    for (let i = 0; i < prizes.length; i++) {
      if (prizes[i].limitedNumberOfTimes === 0) {
        counter++;
      }
    }

    if (counter === prizes.length) {
      return null;
    }

    let rand = Math.random();
    let prizeIndex = null;

    let sum = 0;
    for (var i = prizes.length - 1; i >= 0; i--) {
      sum = sum + parseFloat(prizes[i].percentpage);
      if (rand < sum) {
        prizeIndex = i;
        break;
      }
      continue;
    }

    if (prizes[prizeIndex].limitedNumberOfTimes !== 0) {
      prizes[prizeIndex].limitedNumberOfTimes = prizes[prizeIndex].limitedNumberOfTimes - 1;
      return prizeIndex;
    } else {
      return randomIndex(prizes);
    }
  } else {
    let counter = 0;
    for (let i = 0; i < prizes.length; i++) {
      if (prizes[i].limitedNumberOfTimes === 0) {
        counter++;
      }
    }
    if (counter === prizes.length) {
      return null;
    }
    var rand = (Math.random() * prizes.length) >>> 0;
    if (prizes[rand].limitedNumberOfTimes !== 0) {
      prizes[rand].limitedNumberOfTimes = prizes[rand].limitedNumberOfTimes - 1;
      return rand;
    } else {
      return randomIndex(prizes);
    }
  }
};

/**
 * @param prizeId
 * @param chances
 * @param oldDeg
 * @param prizesTotal
 */
export const getPrize = ({ chances, currentDeg, prizeId, prizesTotal }) => {
  if (prizeId == null && !chances == null) {
    return;
  }
  
  currentDeg = currentDeg || 0;
  let newDeg =
    currentDeg +
    (360 - (currentDeg % 360)) +
    (360 * 10 - prizeId * (360 / prizesTotal));

  
  return {
    optsPrize: {
      prizeId: prizeId,
      chances: prizesTotal,
    },
    deg: newDeg,
  };
};

/**
 *
 * @param {*} id
 * @param {*} text mô tả
 * @param {*} img ảnh đại diện
 * @param {*} limitedNumberOfTimesOfTimeCanHit the limitedNumberOfTimes of times that can hit
 * @param {*} percent tỷ lệ quay trúng
 * @returns Object
 */
export const PrizeItem = (id, text, img, limitedNumberOfTimes, percent) => {
  return { id, text, img, limitedNumberOfTimes, percent };
};
