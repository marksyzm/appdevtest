import { Component, Host, h, State, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  private originalSentencesData: string[];
  private allSentences: string[];
  private mainElement: HTMLElement;
  private sentencesContainerElement: HTMLElement;
  private lastScrollAmount = 0;

  @Prop({ reflect: true }) addSentencesThreshold = 80;
  @Prop({ reflect: true }) sentencesIncrement = 20;
  @Prop() path = '//localhost:8900';

  @State() ready = false;
  @State() sentencesInView: string[];
  @State() sentencesTotal = 0;
  @State() sentencesContainerMarginTop = 0;
  @State() sentencesContainerMarginBottom = 0;

  constructor() {
    this.onScroll = this.onScroll.bind(this);
    this.setMainElement = this.setMainElement.bind(this);
    this.setSentencesContainerElement = this.setSentencesContainerElement.bind(
      this
    );
  }

  async componentDidLoad() {
    await this.fetchSentences();
    this.addSentences();
  }

  @Listen('deviceready', { target: 'document', capture: true })
  onDeviceReady() {
    this.ready = true;
  }

  async fetchSentences() {
    const response = await fetch(this.path);
    this.originalSentencesData = (await response.json())?.random;
    this.allSentences = [...this.originalSentencesData];
  }

  /**
   * Add a count of 20 sentences to the list and update sentences in view
   */
  addSentences() {
    this.sentencesTotal += this.sentencesIncrement;
    if (this.sentencesTotal > this.originalSentencesData.length) {
      this.allSentences = [...this.allSentences, ...this.originalSentencesData];
    }

    this.updateSentencesInView();
  }

  /**
   * Update sentences in view according to scroll position
   */
  updateSentencesInView() {
    const { height } = this.sentencesContainerElement.getBoundingClientRect();
    const itemHeight = height / this.sentencesIncrement;

    const hiddenItemCount = Math.floor(this.mainElement.scrollTop / itemHeight);
    this.sentencesContainerMarginTop = hiddenItemCount * itemHeight;
    this.sentencesContainerMarginBottom =
      (this.sentencesTotal - hiddenItemCount + this.sentencesIncrement) *
      itemHeight;

    const trimSentences = [...this.allSentences].slice(hiddenItemCount);
    trimSentences.length = 20;
    this.sentencesInView = trimSentences;
  }

  onScroll() {
    // if at the bottom of list, add more sentences
    const {
      height: mainElementHeight
    } = this.mainElement.getBoundingClientRect();

    if (
      this.mainElement.scrollTop > this.lastScrollAmount &&
      this.mainElement.scrollTop + mainElementHeight >=
        this.mainElement.scrollHeight - this.addSentencesThreshold
    ) {
      this.addSentences();
      return;
    }

    this.updateSentencesInView();

    this.lastScrollAmount = this.mainElement.scrollTop;
  }

  setMainElement(mainElement: HTMLElement) {
    this.mainElement = mainElement;
  }

  setSentencesContainerElement(sentencesContainerElement: HTMLElement) {
    this.sentencesContainerElement = sentencesContainerElement;
  }

  renderSentences() {
    return this.sentencesInView?.map(sentence => <div>{sentence}</div>);
  }

  get style() {
    return {
      marginTop: `${this.sentencesContainerMarginTop}px`,
      marginBottom: `${this.sentencesContainerMarginBottom}px`
    };
  }

  render() {
    /* if (!this.ready) {
      return;
    } */

    return (
      <Host>
        <header>
          <h1>∞ Infinite ↕ Scroll ∞</h1>
        </header>

        <main onScroll={this.onScroll} ref={this.setMainElement}>
          <section ref={this.setSentencesContainerElement} style={this.style}>
            {this.renderSentences()}
          </section>
        </main>
      </Host>
    );
  }
}
