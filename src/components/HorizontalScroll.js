//core
import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";

//custom
import { NewsCard } from "./NewsCard";

// One item component
// selected prop will be passed
const MenuItem = ({ article }) => {
  return <NewsCard article={article} />;
};

// All items component
// Important! add unique key
export const Menu = list =>
  list.map((el, i) => {
    return <MenuItem article={el} key={i} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">>", className: "arrow-next" });

class HScroll extends Component {
  state = {
    selected: 0
  };

  onSelect = key => {
    this.setState({ selected: key });
  };

  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = Menu(this.props.articlesByCategory, selected);

    return (
      <div>
        <ScrollMenu
          wheel={false}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
        />
      </div>
    );
  }
}

export default HScroll;
