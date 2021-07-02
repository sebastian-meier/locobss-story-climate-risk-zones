<script>
  import * as animateScroll from 'svelte-scrollto'
  import { onMount } from 'svelte'
  import { zipcodes, data, jsonData, userInput } from 'stores'
  import { loadFile, loadTopojson } from 'utils'
  import { content, steps } from 'config'
  import { zipCodesUrl } from 'constants'

  import Zeitreihe from 'views/zeitreihe.svelte'
  import Szenarien from 'views/szenarien.svelte'
  import Onboarding from 'views/onboarding.svelte'
  import Animation from 'views/animation.svelte'
  import ReadingList from 'views/readinglist.svelte'

  import Button from 'components/Button.svelte'
  import Header from 'components/Header.svelte'
  import Section from 'components/Section.svelte'
  import Share from 'components/Share.svelte'
  import Appendix from 'components/Appendix.svelte'
  import Anchor from './components/Anchor.svelte'

  function scrollToOnboarding() {
    animateScroll.scrollTo({
      element: `[id='anchor-3.0']`,
      offset: -50,
    })
  }

  onMount(async () => {
    const topo = await loadTopojson(
      'data/timeseries_air_temperature_mean_avg.simple.topo.json'
    )
    const codes = await loadFile(zipCodesUrl)
    jsonData.set(topo)
    zipcodes.set(codes.columns)
    data.set(content)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  global {
    .disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  .container {
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    color: $color-main;
    margin: 0 auto;
  }
  
  p.addition {
    color: $color-main-60;
    line-height: 150%;
    font-size: $font-size-xs;
  }
</style>

<div class="container">
  <Header />
  <Section>
    Steigende Temperaturen, vermehrte Extremwettereignisse und andere
    Veränderungen, die sich auf den fortschreitenden Klimawandel zurückführen
    lassen, haben einen direkten Einfluss auf unsere Umwelt und auf unser
    alltägliches Leben. Die Auswirkungen bekommen wir schon jetzt zu spüren: 
    Wir Menschen werden durch Extremwetterlagen genauso belastet, wie 
    unsere Tier- und Pflanzenwelt, was zum Beispiel direkte Auswirkungen 
    auf die Land- und Forstwirtschaft hat. Erfahre mehr darüber, was dies im Detail 
    für deine spezifische Region bedeutet:
    <p class="addition">
      <strong>Privatsphäre geht vor:</strong>
      Die von dir hier angegebenen Information werden von uns nicht gespeichert.
      Diese Seite nutzt keine Cookie- oder Tracking-Technologien.
    </p>
  </Section>
  <!-- <Animation /> -->
  <Anchor anchorId={steps.szenarien} />
  <Onboarding />
  {#if $userInput}
    <Szenarien />
    <Section>
      Wenn über die Folgen des Klimawandels berichtet wird, hören wir häufig vom
      Schmelzen des arktischen Eises, von tropischen Inseln, die vom Anstieg
      des Meeresspiegels akut bedroht sind, oder von den extremen Bränden in
      Australien oder der Westküste der USA. Doch dies sind nur die globalen Extreme der
      Klimawandelfolgen. Auch in unseren Breiten können wir die Folgen bereits
      spüren.<br /><br />
      In vielen Regionen Deutschlands hat es in den letzten Jahren vermehrt
      längere Dürreperioden gegeben. Frost- und Schneetage haben abgenommen,
      während heiße Tage
      <span class="addition">(> 30&thinsp;°C)</span>
      und sogenannte Tropennächte
      <span class="addition">(> 20&thinsp;°C)</span>
      zugenommen haben.
    </Section>
    <Zeitreihe />
    <Section>
      Die folgende Karte zeigt die durchschnittliche Temperatur in Deutschland
      seit 1887. Über diesen langen Zeitraum wird deutlich, dass es
      schon immer mal heißere und kältere Jahre gab. Aber einen so kontinuierlichen
      Anstieg, wie wir ihn seit den 1980er Jahren verzeichnen können, gab es in
      diesem Messungszeitraum bisher nicht. Klimawandel und Klima im
      Allgemeinen beschreiben genau solche langfristigen größeren Veränderungen
      und Zusammenhänge, die sich unabhängig von lokalen Wetterextremen in den
      Daten abzeichnen.
    </Section>
    <Animation />
    <Section>
      Der Klimawandel wird in den kommenden Jahren noch deutlichere 
      Risiken für Deutschland mit sich bringen. 
      Es reicht daher nicht nur, den Klimawandel langfristig zu stoppen oder
      zumindest zu verlangsamen. Wir müssen auch jetzt schon lernen, mit 
      den Folgen des Klimawandels umzugehen.

      <p>Weitere Regionen entdecken:</p>
      <Button primary={true} handleClick={scrollToOnboarding}>
        Zurück zur Auswahl
      </Button>
      <br />
      <br />

      Für weiterführende Informationen empfehlen wir die Seiten des
      Umweltbundesamts. Im Folgenden haben wir eine Reihe an Artikeln
      zusammengestellt, die besonders relevante Themen für deine Region hervorheben:
    </Section>
    <Section>
      <ReadingList />
    </Section>
    <Share />
    <Appendix />
  {/if}
</div>
