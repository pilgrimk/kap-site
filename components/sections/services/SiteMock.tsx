import type { SiteMock } from "@/lib/content";
import { cn } from "@/lib/utils";
import s from "./site.module.css";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** A numbered annotation badge, matched to a note beside the mock. */
function Pin({ n, className, at }: { n: number; className: string; at?: number }) {
  return (
    <span className={cn(s.pin, at !== undefined && s.pop, className)} style={at !== undefined ? delay(at) : undefined}>
      {n}
    </span>
  );
}

/** Browser window around an illustrative page. Children fill the viewport below the address bar. */
export function BrowserFrame({ url, className, children }: { url: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(s.frame, className)}>
      <div className={s.scaled}>
        <div aria-hidden className={s.chrome}>
          <span className={s.dot} />
          <span className={s.dot} />
          <span className={s.dot} />
          <span className={s.url}>{url}</span>
        </div>
        <div className={s.viewport}>{children}</div>
      </div>
    </div>
  );
}

/** The redesigned illustrative site at desktop width. `pinsAt` shows annotation pins 1 and 2. */
export function SiteDesktop({ site, pinsAt }: { site: SiteMock; pinsAt?: [number, number] }) {
  return (
    <div aria-hidden className={s.site}>
      <div className={s.siteNav}>
        <span className={s.brand}>
          <span className={s.leaf} />
          {site.name}
        </span>
        {site.nav.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span className={s.navCta}>{site.navCta}</span>
      </div>
      <div className={s.heroRow}>
        <div className={s.copy}>
          <p className={s.headline}>
            {pinsAt ? <Pin n={1} className={s.pinHeadline} at={pinsAt[0]} /> : null}
            {site.headline}
          </p>
          <p className={s.body}>{site.body}</p>
          <div className={s.actions}>
            <span className={s.cta}>
              {pinsAt ? <Pin n={2} className={s.pinCta} at={pinsAt[1]} /> : null}
              {site.cta}
            </span>
            <span className={s.secondary}>{site.secondary}</span>
          </div>
        </div>
        <div className={s.garden} />
      </div>
      <div className={s.tiles}>
        {site.tiles.map((tile) => (
          <span key={tile} className={s.tile}>
            <span className={s.tileIcon} />
            {tile}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The same site on a phone, with the contact bar always in reach. `pinAt` shows pin 3. */
export function SitePhone({ site, bar, pinAt, className }: { site: SiteMock; bar: string[]; pinAt?: number; className?: string }) {
  return (
    <div aria-hidden className={cn(s.phone, className)}>
      <div className={cn(s.site, s.phoneScreen)}>
        <div className={s.status}>
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <div className={s.phoneNav}>
          <span className={s.brand}>
            <span className={s.leaf} />
            {site.name}
          </span>
          <span className={s.menu}>
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className={cn(s.garden, s.phoneGarden)} />
        <p className={s.phoneHeadline}>{site.headline}</p>
        <p className={s.phoneBody}>{site.body}</p>
        <div className={s.phoneTiles}>
          {site.tiles.map((tile) => (
            <span key={tile} className={s.tile}>
              <span className={s.tileIcon} />
              {tile}
            </span>
          ))}
        </div>
        <div className={s.bar}>
          <span className={s.barCall}>{bar[0]}</span>
          <span className={s.barQuote}>
            {pinAt !== undefined ? <Pin n={3} className={s.pinBar} at={pinAt} /> : null}
            {bar[1]}
          </span>
        </div>
      </div>
    </div>
  );
}

type DatedSite = { name: string; welcome: string; nav: string[]; body: string; link: string; list: string[]; footer: string };

/** The same business's dated site: crowded menu, no clear offer, contact details buried. */
export function SiteDated({ site }: { site: DatedSite }) {
  return (
    <div aria-hidden className={s.dated}>
      <div className={s.datedBanner}>
        <p className={s.datedName}>{site.name}</p>
        <p className={s.datedWelcome}>{site.welcome}</p>
      </div>
      <div className={s.datedNav}>
        {site.nav.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className={s.datedMain}>
        <div className={s.datedPhoto} />
        <div className={s.datedText}>
          <p>{site.body}</p>
          <span className={s.datedLink}>{site.link}</span>
          <ul className={s.datedList}>
            {site.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className={s.datedFooter}>{site.footer}</p>
    </div>
  );
}

/** The same page as an early wireframe: layout and hierarchy before colour and type. */
export function SiteWireframe({ site }: { site: SiteMock }) {
  return (
    <div aria-hidden className={cn(s.site, s.wire)}>
      <div className={s.siteNav}>
        <span className={s.brand}>
          <span className={s.wireBox} style={{ width: "1.3em", height: "1.3em" }} />
          <span className={s.wireLine} style={{ width: "8em" }} />
        </span>
        {site.nav.map((item) => (
          <span key={item} className={s.wireLine} style={{ width: "3.6em" }} />
        ))}
        <span className={s.wirePill} />
      </div>
      <div className={s.heroRow}>
        <div>
          <span className={s.wireHead} />
          <span className={s.wireHead} style={{ width: "70%" }} />
          <span className={s.wireLine} style={{ width: "85%", marginTop: "1.4em" }} />
          <span className={s.wireLine} style={{ width: "60%", marginTop: "0.6em" }} />
          <span className={s.wireButton} />
        </div>
        <div className={cn(s.garden, s.wireImage)} />
      </div>
      <div className={s.tiles}>
        {site.tiles.map((tile) => (
          <span key={tile} className={s.wireTile} />
        ))}
      </div>
    </div>
  );
}
