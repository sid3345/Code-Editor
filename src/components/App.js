import Switch from "react-switch";
import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
var FileSaver = require('file-saver');

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [checked, setchecked] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])


  const download = () => {
    var blob = new Blob([srcDoc], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "download.txt");
  }

  const mode = (checked) => {
    setchecked(checked);
  }

  return (
    <>
     
      
      <div className = "box">
        
        <div className = "editors">
          <label  style = {{margin : "10px"}}>
            <span style = {{color : "white", }}>Mode</span>
            <br />
            <Switch onColor='#000000' checkedIcon={false} uncheckedIcon={false} onChange={mode} checked={checked} />
          </label>


          <button className = "Button" onClick={() => download()}>Download Code</button>

          <div className="pane">
            <Editor
              language="xml"
              displayName="HTML"
              value={html}
              onChange={setHtml}
              checked={checked}x
            />
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
              checked={checked}
            />
            <Editor
              language="javascript"
              displayName="JS"
              value={js}
              onChange={setJs}
              checked={checked}
            />
          </div>
        </div>


        <div style={{
          marginRight: "5px",
          display: "flex",
          marginLeft: "auto",
          minHeight: "100vh",
          width: "55%",
          overflow: "hidden"
        }}>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="1"
            width="100%"
            height="100%"
          />
        </div>

      </div>


    </>
  )
}

export default App;
