<script>
  import { appendix } from 'constants'

  const logos = [
    {
      url: '/data/BMBF_Logo.svg',
      alt: 'Link zum Code auf Github',
      maxWidth: '152px',
      height: '106px',
      text:
        'Gefördert durch das <a target="_blank" href="https://www.bmbf.de/">Bundesministerium für Bildung und Forschung.</a>',
      width: '100%',
    },
    {
      url: '/data/github.png',
      alt: 'Link zum Code auf Github',
      maxWidth: '65px',
      text:
        'Der Code zum Projekt ist auf <a target="_blank" href="https://github.com/sebastian-meier/locobss-story-climate-risk-zones">GitHub</a> zu finden.',
      width: 'calc(50% - 1em)',
    },
    {
      url: '/data/vislab@2x.jpg',
      alt: 'Link zum Code auf Github',
      maxWidth: '75px',
      text:
        'Ein Projekt von <a target="_blank" href="https://vislab.io">Vislab.io</a> als Teil des Forschungs&shy;vorhaben LoCobSS.',
      width: '50%',
    },
  ]
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .container {
    width: 100%;
    line-height: 160%;
    padding-top: 50px;
    border-top: 1px solid $color-main-20;
    margin: 100px 0;
    letter-spacing: 0.01em;
  }

  .item-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 0 20px 0;
  }

  .item-text {
    margin: 10px 0 0 0;
  }

  .sources {
    margin-bottom: 3em;
  }

  .logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .appendix {
    max-width: 720px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 170%;
    font-size: $font-size-xs;
    color: $color-main-60;
    margin: auto;

    @include respond-min-screen-tablet {
      flex-direction: row;
    }
  }

  .row {
    width: calc(100% - 4em);
    align-self: center;
    align-self: center;

    &:first-of-type {
      margin-bottom: 20px;
    }

    @include respond-min-screen-tablet {
      width: calc(50% - 1em);
      flex-direction: row;
      align-self: flex-start;
    }
  }

  .title {
    letter-spacing: $letter-spacing-s;
    font-family: $font-bold;
    color: $color-main;
  }

  .partners {
    display: table;
  }

  .partners > div {
    display: table-row;
  }

  .partners > div > div {
    display: table-cell;
    vertical-align: middle;
  }

  .partners img {
    max-width: 200px;
    width: 80%;
  }
</style>

<div class="container">
  <div class="appendix">
    <div class="row">
      <h3 class="title">Methodik</h3>
      {@html appendix.method}
      <div class="item-wrapper" style="width: 100%;">
        <span class="item-text">{@html appendix.privacy}</span>
      </div>
    </div>
    <div class="row">
      <div class="sources">
        <h3 class="title">Quellen</h3>
        <ul>
          {#each appendix.sources as source}
            <li>
              <a href={source[0]}>{@html source[1]}</a>
            </li>
          {/each}
        </ul>
      </div>
      <div class="logos">
        {#each logos as item}
          <div class="item-wrapper" style="width: {item.width};">
            <img
              src={item.url}
              alt={item.alt}
              style="max-width: {item.maxWidth}; height: {item.height}" />
            <span class="item-text">{@html item.text}</span>
          </div>
        {/each}
      </div>
      <div class="item-wrapper" style="width: 100%;">
        <img src="/data/mapbox-logo-black.svg" alt="Mapbox"
              style="max-width: 100%; height: auto; width:130px;" />
        <span class="item-text">{@html appendix.mapbox}</span>
      </div>
    </div>
  </div>
</div>
