import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal } from 'lucide-react';

interface AIInstructionsProps {
  eventId?: string;
}

export function AIInstructions({ eventId }: AIInstructionsProps) {
  if (!eventId) return null;

  return (
    <section className="mt-8" id="ai-access">
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Terminal className="h-5 w-5 text-muted-foreground" />
            Programmatic Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            AI agents and developers can fetch this post's raw data directly from Nostr relays using the{' '}
            <a 
              href="https://github.com/fiatjaf/nak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              nak
            </a>
            {' '}command-line tool:
          </p>

          <div className="rounded-md bg-muted p-4 font-mono text-sm">
            <code className="text-foreground">
              nak req -i {eventId} wss://relay.ditto.pub
            </code>
          </div>

          <details className="text-sm">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              Alternative relays and methods
            </summary>
            <div className="mt-3 space-y-3 pl-4 border-l-2 border-border">
              <p className="text-muted-foreground">
                Try these additional relays if the primary relay is unavailable:
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="rounded bg-muted/50 p-2">
                  <code>nak req -i {eventId} wss://relay.primal.net</code>
                </div>
                <div className="rounded bg-muted/50 p-2">
                  <code>nak req -i {eventId} wss://relay.damus.io</code>
                </div>
              </div>
              <p className="text-muted-foreground pt-2">
                You can also use any Nostr client library to fetch events by ID. See{' '}
                <a 
                  href="https://github.com/nostr-protocol/nostr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  nostr-protocol documentation
                </a>
                {' '}for more information.
              </p>
            </div>
          </details>

          <div className="text-xs text-muted-foreground pt-2 border-t border-border">
            <p>
              <strong>Event ID:</strong> <code className="font-mono bg-muted px-1 py-0.5 rounded">{eventId}</code>
            </p>
            <p className="mt-1">
              This content is stored on the Nostr protocol, a decentralized social network. 
              The event ID above is the unique identifier for this post.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
