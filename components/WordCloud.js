
import React from 'react';
import Typed from 'typed.js';

class WordCloud extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      ...props,
      words: ['Rio de Janeiro', 'CBD', 'Oil', 'Products', 'London', 'Legalize', 'Prescription'],
			cloud: [],
      timer: {
        controller: null,
        value: 100,
        acceleration: 1.1,
        max: 1000
      },
      sizes: [20, 24, 32, 36, 40, 48, 64, 80],
      limit: 100,
			count: 0
		};

		this.setCount = this.setCount.bind(this);
	}
  setCount () {
		this.setState({ count: this.state.count + 1 });
	}
  setCloud (word) {
    this.setCount();
		this.setState({ cloud: [...this.state.cloud, word] });
	}

  build = () => {
    const text = this.getWord();
    const style = this.getStyle();
    this.setCloud({ text, style });
    console.log(text, style, this.state.count);

    if (this.state.timer.value<this.state.timer.max) this.state.timer.value *= this.state.timer.acceleration;
    
    if (this.state.count<this.state.limit) {
      this.state.timer.controller = setTimeout(() => {
        this.state.timer.controller = null;
        this.build();
      }, this.state.timer.value);
    }
  }

  getWord = () => {
    const min = 0;
    const max = this.state.words.length-1;
    const i = this.randomizer(min, max);
    const word = this.state.words[i];
    return word;
  }

  getPosition = () => {
    const angle = Math.random()*Math.PI*2;
    const radius = 40;
    const x = (Math.cos(angle)*radius) + 50 + this.randomizer(0, 5, true);
    const y = (Math.sin(angle)*radius) + 50 + this.randomizer(0, 5, true);
    return { x, y }
  }
  getStyle = () => {
    const { x, y } = this.getPosition();
    const size = 20 //this.state.sizes[this.randomizer(0, this.state.sizes.length-1)];
    return { 
      left: `${x}%`, 
      top: `${y}%`, 
      fontSize: `${size}px`
    }
  }

  randomizer = (min, max, signal=false) => {
    const sign = signal&&Math.random() < 0.5 ? -1 : 1;
    return Math.floor(Math.random() * (max - min + 1) + min) * sign;
  }

  componentDidMount () {
    this.build();
  }
  componentWillUnmount () {
    if (this.state.timer.controller!=null) clearTimeout(this.state.timer.controller);
  }
  
  render () {
    return (
      <div className="word-cloud z-0 font-serif">
        {this.state.cloud.map((word, i) => (
          <span 
            key={i} 
            className="word"
            style={word.style}
          >
            { word.text }
          </span>
        ))}
      </div>
    )
  }
}

export default WordCloud
