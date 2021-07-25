function isNum(string) {
  return !isNaN(string);
}

function calc_percent_prob(numerator, denominator) {
  const prob = numerator / denominator;
  const percent = prob * 100;
  return percent;
}

const form = document.querySelector("#form");
const result_div = document.querySelector("#resultDiv");

function addEntry(text) {
  let p = document.createElement("p");
  p.textContent = text;
  p.classList.add("entry");
  result_div.appendChild(p);
}

function calc(event) {
  let fascist_count = form.children[0].children.fascist.value;
  let liberal_count = form.children[1].children.liberal.value;

  if (!isNum(fascist_count) || !isNum(liberal_count)) {
    result_div.textContent = "Please enter a valid number";
    return;
  }

  fascist_count = parseInt(fascist_count);
  liberal_count = parseInt(liberal_count);

  if (isNaN(fascist_count) || isNaN(liberal_count)) {
    result_div.textContent = "Please enter a valid number";
    return;
  }

  result_div.textContent = "";

  const total = fascist_count + liberal_count;
  const denominator = total * (total - 1) * (total - 2);
  if (denominator === 0) {
    result_div.textContent = "Too few cards";
    return;
  }

  const three_fascist_numerator =
    fascist_count * (fascist_count - 1) * (fascist_count - 2);
  const three_fascist_percent = calc_percent_prob(
    three_fascist_numerator,
    denominator
  );

  const two_fascist_numerator =
    3 * fascist_count * (fascist_count - 1) * liberal_count;
  const two_fascist_percent = calc_percent_prob(
    two_fascist_numerator,
    denominator
  );

  const one_fascist_numerator =
    3 * fascist_count * liberal_count * (liberal_count - 1);
  const one_fascist_percent = calc_percent_prob(
    one_fascist_numerator,
    denominator
  );

  const zero_fascist_numerator =
    liberal_count * (liberal_count - 1) * (liberal_count - 2);
  const zero_fascist_percent = calc_percent_prob(
    zero_fascist_numerator,
    denominator
  );

  addEntry(`F F F ${three_fascist_percent.toFixed(1)}%`);
  addEntry(`F F L ${two_fascist_percent.toFixed(1)}%`);
  addEntry(`F L L ${one_fascist_percent.toFixed(1)}%`);
  addEntry(`L L L ${zero_fascist_percent.toFixed(1)}%`);
}
