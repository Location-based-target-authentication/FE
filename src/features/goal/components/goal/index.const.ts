export const DATEITEM_BASIC_CLASS_NAME =
  "flex size-9 items-center justify-center rounded-md";

export const generateDateString = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric"
  });

  return formattedDate;
};

export const generateTodyString = () => {
  const today = new Date();

  return today.toISOString().split("T")[0];
};

export const generateCertificationItem = ({
  viewDay,
  day
}: {
  viewDay: string;
  day: string;
}) => ({
  className: `${DATEITEM_BASIC_CLASS_NAME} bg-green-500 text-white`,
  day,
  key: viewDay
});

export const generateNonCertificationItem = ({
  viewDay,
  day,
  isToday
}: {
  viewDay: string;
  day: string;
  isToday: boolean;
}) => {
  const backgroundColor = isToday ? "bg-green-100" : "bg-gray-100";
  const textColor = isToday ? "text-green-500" : "text-gray-400";

  return {
    className: `${DATEITEM_BASIC_CLASS_NAME} ${backgroundColor} ${textColor}`,
    day,
    key: viewDay
  };
};
