import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { JSDOM } from 'jsdom';

// Read the built index.html
const indexHtml = readFileSync('dist/index.html', 'utf-8');

// Parse with jsdom
const dom = new JSDOM(indexHtml);
const document = dom.window.document;
const root = document.getElementById('root');

// Create the AI instructions template HTML
const templateHTML = `
<div class="min-h-screen bg-background">
  <main class="container py-6">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      <div class="space-y-4">
        <div class="rounded-lg border border-border bg-card p-8 text-center">
          <div class="max-w-2xl mx-auto space-y-4">
            <h1 class="text-2xl font-semibold">Loading Post...</h1>
            <p class="text-muted-foreground">
              This page is loading the post content from the Nostr network.
            </p>
          </div>
        </div>

        <section class="mt-8" id="ai-access">
          <div class="rounded-lg border border-dashed border-border bg-card">
            <div class="p-6 space-y-2 border-b border-border">
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
                Programmatic Access
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <p class="text-sm text-muted-foreground">
                AI agents and developers can fetch this post's raw data directly from Nostr relays using the 
                <a href="https://github.com/fiatjaf/nak" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">nak</a>
                command-line tool:
              </p>

              <div class="rounded-md bg-muted p-4 font-mono text-sm">
                <code class="text-foreground">nak req -i &lt;EVENT_ID&gt; wss://relay.ditto.pub</code>
              </div>

              <details class="text-sm">
                <summary class="cursor-pointer text-muted-foreground hover:text-foreground">
                  Alternative relays and methods
                </summary>
                <div class="mt-3 space-y-3 pl-4 border-l-2 border-border">
                  <p class="text-muted-foreground">
                    Try these additional relays if the primary relay is unavailable:
                  </p>
                  <div class="space-y-2 font-mono text-xs">
                    <div class="rounded bg-muted/50 p-2">
                      <code>nak req -i &lt;EVENT_ID&gt; wss://relay.primal.net</code>
                    </div>
                    <div class="rounded bg-muted/50 p-2">
                      <code>nak req -i &lt;EVENT_ID&gt; wss://relay.damus.io</code>
                    </div>
                  </div>
                  <p class="text-muted-foreground pt-2">
                    You can also use any Nostr client library to fetch events by ID. See 
                    <a href="https://github.com/nostr-protocol/nostr" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">nostr-protocol documentation</a>
                    for more information.
                  </p>
                </div>
              </details>

              <div class="text-xs text-muted-foreground pt-2 border-t border-border">
                <p>
                  <strong>Note:</strong> The event ID will be available once the page fully loads. 
                  You can extract it from the URL path after <code class="font-mono bg-muted px-1 py-0.5 rounded">/post/</code>
                </p>
                <p class="mt-1">
                  This content is stored on the Nostr protocol, a decentralized social network. 
                  The event ID is the unique identifier for this post.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</div>
`;

// Set the template HTML in the root div
if (root) {
  root.innerHTML = templateHTML;
}

// Ensure the directory exists
mkdirSync('dist/post-template', { recursive: true });

// Write to dist/post-template/index.html
writeFileSync('dist/post-template/index.html', dom.serialize());

console.log('✓ Generated dist/post-template/index.html');
