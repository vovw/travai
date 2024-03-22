export const PROCESSING_WAIT = 1000;
export const waitForProcessing = async (time = PROCESSING_WAIT) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};

// module.exports.USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
export const USER_AGENT = process.env.USER_AGENT;

export const getDateFormatted = (dateStr) => {
  const [dateDay, dateMonth, dateYear] = dateStr.split(" ");
  let month = "01";
  switch (dateMonth) {
    case "January":
      month = "01";
      break;
    case "February":
      month = "02";
      break;
    case "March":
      month = "03";
      break;
    case "April":
      month = "04";
      break;
    case "May":
      month = "05";
      break;
    case "June":
      month = "06";
      break;
    case "July":
      month = "07";
      break;
    case "August":
      month = "08";
      break;
    case "September":
      month = "09";
      break;
    case "October":
      month = "10";
      break;
    case "November":
      month = "11";
      break;
    case "December":
      month = "12";
      break;
  }
  return `${dateDay}/${month}/${dateYear}`;
};
