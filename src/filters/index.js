export function price(num) {
  if (num == 0) {
    return (num = "免费");
  } else {
    var a = num / 100;
    return a.toFixed(2);
  }
}
