import { Component, h, State } from '@stencil/core';

const SENTENCES_INCREMENT = 20;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  private allSentences: string[];
  private mainElement: HTMLElement;

  @State() sentencesInView: string[];
  @State() sentencesTotal = 0;

  constructor() {
    this.onScroll = this.onScroll.bind(this);
    this.setMainElement = this.setMainElement.bind(this);
  }

  async componentDidLoad() {
    await this.fetchSentences();
    this.addSentences();
  }

  async fetchSentences() {
    const response = await fetch('//localhost:8900');
    this.allSentences = (await response.json())?.random;
  }

  /**
   * Add a count of 20 sentences to the list and update sentences in view
   */
  addSentences() {
    this.sentencesTotal += SENTENCES_INCREMENT;
    this.updateSentencesInView();
  }

  /**
   * Update sentences in view according to scroll position
   */
  updateSentencesInView() {
    const trimSentences = [...this.allSentences];
    trimSentences.length = 20;
    this.sentencesInView = trimSentences;
  }

  onScroll() {
    // if at the bottom of list, add more sentences
    // if (this.mainElement.scrollTop > someHeight) {
    //   this.addSentences();
    // }
  }

  setMainElement(mainElement: HTMLElement) {
    this.mainElement = mainElement;
    console.log(this.mainElement);
  }

  renderSentences() {
    return this.sentencesInView?.map(sentence => <section>{sentence}</section>);
  }

  get style() {
    return { marginTop: '0px' };
  }

  render() {
    return (
      <div>
        <header>
          <h1>∞ Infinite ↕ Scroll ∞</h1>
        </header>

        <main
          onScroll={this.onScroll}
          style={this.style}
          ref={this.setMainElement}
        >
          {this.renderSentences()}
        </main>
      </div>
    );
  }
}
