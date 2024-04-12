`yarn add prism-react-renderer`

Export `<Highlight />` component along with `themes`.

Example

```
<Highlight
    theme={themes.shadesOfPurple}
    code={codeBlock}
    language="tsx"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            <span>{i + 1}</span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
```

`useTokenize()` is a raect hook that tokenizes code using Prism.
It returns array of tokens that can be rendered using the built-in <Highlight /> component or own custom commonent
