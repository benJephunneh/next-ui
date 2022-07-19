import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext } from "blitz"
import { CssBaseline } from "@nextui-org/react"
import React from "react"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    }
  }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>{CssBaseline.flush()}</DocumentHead>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
