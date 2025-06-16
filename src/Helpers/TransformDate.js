export default function TransformDate(date) {
  let selectedData = new window.Date(date);
  let getFullYear = selectedData.getFullYear();
  let getMonth = (selectedData.getMonth() + 1).toString().padStart(2, "0");
  let getDay = selectedData.getDate().toString().padStart(2, "0");
  return `${getFullYear}-${getMonth}-${getDay}`;
}
