import { createRoot } from 'react-dom/client';
import { renderReactMarkdown } from './src';
import { useEffect, useState } from 'react';

const md = `# Pluto

Pluto is a dwarf planet in the Kuiper belt.

## Contents

## History

### Discovery

In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…

### Name and symbol

The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…

### Planet X disproved

Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

## Orbit

Pluto’s orbital period is about 248 years…

[百度](https://baidu.com)
[内链](/xxx)

![alt content](https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg "Magic Gardens")
`

function Index() {
  const [Comp, setComp] = useState()
  useEffect(() => {
    renderReactMarkdown(md).then((result) => {
      console.log('result', result)
      setComp(result.result)
    })
  }, [])
  if (!Comp) {
    return <div>Loading Markdown ...</div>
  }
  return Comp
}

const root = createRoot(document.getElementById('root'));
root.render(<Index />);