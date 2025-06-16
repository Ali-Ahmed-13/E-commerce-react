export default function stringSlice(data, sliceEnd) {
  return data.length > sliceEnd ? data.slice(0, sliceEnd) + "..." : data;
}
