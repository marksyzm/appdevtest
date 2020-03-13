import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  constructor() {
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidLoad() {
    this.fetchSentences();
  }

  async fetchSentences() {
    const result = await fetch('//localhost:8900');
    console.log(await result.json());
  }

  onScroll() {
    // get list from generated file

    // if it goes beyond length of sentences, start from the beginning
  }

  render() {
    return (
      <div>
        <header>
          <h1>∞ Infinite ↕ Scroll ∞</h1>
        </header>

        <main onScroll={this.onScroll}>

        </main>
      </div>
    );
  }
}
