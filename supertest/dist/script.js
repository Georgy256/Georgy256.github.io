let massiv = [["Какое число получится, если 5 * 5?", 25, 1], ["Сколько часов в сутках?", 24, 2], ["Сколько будет 30 * 2?", 60, 2], ["Сколько будет 60 * 5?", 300, 3], ["Сколько будет 3*2?", 6, 4], ["Сколько месяцев в году?", 12, 2]];
let elem = document.querySelector("#test");

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.massiv = props.massiv;
    this.setState = this.setState.bind(this);
  }

  render() {
    console.log(this.state);
    return (
      React.createElement("div", null,
      this.state && this.state.button ? React.createElement(ResultTest, { massiv: this.massiv, answers: this.state }) : React.createElement(Slider, { massiv: this.massiv, setState: this.setState })));


  }}


class ResultTest extends React.Component {
  constructor(props) {
    super(props);
    this.massiv = props.massiv;
    this.answers = props.answers;
    this.state = {
      rightAnswers: 0,
      total: 0 };

  }

  scoreСalculation(rightAnswers) {

    let score;

    if (rightAnswers < this.state.total * 0.4) {
      score = 2;
    }

    if (this.state.total * 0.4 < rightAnswers && this.state.total * 0.6 > rightAnswers) {
      score = 3;
    }

    if (rightAnswers >= this.state.total * 0.6 && rightAnswers <= this.state.total * 0.8) {
      score = 4;
    }

    if (rightAnswers > this.state.total * 0.8) {
      score = 5;
    }

    return score;
  }

  render() {
    let results = [];
    let self = this;
    this.massiv.forEach(function (elem, index) {
      results.push(React.createElement("p", null, elem[0], React.createElement("br", null), self.answers[index][0]));
      if (self.answers[index][1]) {
        self.state.rightAnswers = self.state.rightAnswers + elem[2];
      }

      self.state.total = self.state.total + elem[2];
    });

    return (
      React.createElement("div", null,
      results,
      React.createElement("h2", null, "\u0412\u0430\u0448\u0430 \u043E\u0446\u0435\u043D\u043A\u0430: ", self.scoreСalculation(self.state.rightAnswers))));


  }}


class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.massiv = props.massiv;
    this.setStateByTest = props.setState;
    this.width = 270;
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.setStateBySlider = this.setState.bind(this);
    this.state = {
      position: 0,
      everythingIsReady: false };

  }

  next() {
    if (this.state.position - this.width >= -this.massiv.length * this.width + this.width) {
      this.setState({ position: this.state.position - this.width });
    }
  }

  prev() {
    if (this.state.position + this.width <= 0) {
      this.setState({ position: this.state.position + this.width });
    }
  }

  render() {

    return (
      React.createElement("div", { class: "carousel", style: { width: `${this.width}px` } },
      React.createElement("ul", { class: "ul", style: { transform: `translateX(${this.state.position}px)` } }, React.createElement(PartTest, { massiv: this.massiv, setStateByTest: this.setStateByTest, setStateBySlider: this.setStateBySlider })),

      React.createElement(Button, { class: "prev", symbol: "&#60;", prev: this.prev }),
      React.createElement(Button, { class: "next", symbol: "&#62;", next: this.next }),
      this.state.everythingIsReady ?
      React.createElement("button", { style: { color: "green", marginTop: "10px" }, onClick: e => this.setStateByTest({ button: true }) }, "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0442\u0435\u0441\u0442") : React.createElement("span", null)));




  }}


class PartTest extends React.Component {
  constructor(props) {
    super(props);
    this.setStateByTest = props.setStateByTest;
    this.massiv = props.massiv;
    this.setState = this.setState.bind(this);
    this.state = {};
    this.setStateBySlider = props.setStateBySlider;
    this.test = true;
    this.changeTest = this.changeTest.bind(this);
  }

  changeTest(state) {
    this.test = state;
  }

  isReady() {

    for (let i = 0; i < this.massiv.length; i++) {
      if (!(this.test && this.state.hasOwnProperty(`${i}`) && !(this.state[`${i}`] == undefined))) return;
    }

    console.log(2);
    this.setStateBySlider({ everythingIsReady: true });
    this.setStateByTest(this.state);
    this.test = false;

  }

  render() {

    this.isReady();
    let self = this;
    let asks_answers = [];
    this.massiv.forEach(function (elem, index) {
      asks_answers.push(
      React.createElement("li", null, React.createElement(Ask, { ask: elem[0] }),
      React.createElement(Answer, { correctAnswer: elem[1], changeTest: self.changeTest, index: index, setStateBySlider: self.setStateBySlider, setState: self.setState })));

    });
    return (
      asks_answers);

  }}


function Ask(props) {
  return (
    React.createElement("p", null, props.ask));

}

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.correctAnswer = props.correctAnswer;
    this.setState2 = props.setState;
    this.index = props.index;
    this.changeTest = props.changeTest;
    this.setStateBySlider = props.setStateBySlider;
  }

  checkAnswer(answer) {
    if (answer == "") {
      this.setState2({ [this.index]: undefined });
      this.setStateBySlider({ everythingIsReady: false });
      return;
    }

    this.changeTest(true);
    if (answer == this.correctAnswer) {
      this.setState2({ [this.index]: [React.createElement("p", { style: { color: "green" } }, "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442 ", answer, ", \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E!"), true] });
    } else {
      this.setState2({ [this.index]: [React.createElement("p", { style: { color: "red" } }, "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442 ", answer, ", \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E!"), false] });
    }
  }

  render() {
    return (
      React.createElement("input", { type: "text", onBlur: e => this.checkAnswer(e.target.value) }));

  }}



class Button extends React.Component {
  constructor(props) {
    super(props);
    this.symbol = props.symbol;
    this.class = props.class;
    this.prev = props.prev;
    this.next = props.next;
  }

  click(classList) {

    if (classList.indexOf("prev") != -1) {
      this.prev();
    } else {
      this.next();
    }
  }

  render() {
    return (
      React.createElement("button", { class: this.class, onClick: e => this.click(e.target.classList.value) }, this.symbol));

  }}


ReactDOM.render(React.createElement(Test, { massiv: massiv }), elem);
