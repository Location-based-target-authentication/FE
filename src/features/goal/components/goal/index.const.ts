export const generateDateString = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric"
  });

  return formattedDate;
};
