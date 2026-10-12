import { AddScreen, ConfirmScreen, DashboardScreen, HomeScreen, Phone, PrivacyScreen } from "@/components/case/FinwiseScreens";

// The Finwise case study, told the way Madhav tells his case studies:
// highlights → problem space → who it's for → gaps → insights → structure → final screens → details → build.
// Everything here comes from the app itself (~/finance-tracker): its features, copy, edge cases and tests.

function Label({ children }: { children: React.ReactNode }) {
  return <h2 className="cs-label">{children}</h2>;
}

// A designed thumbnail for the AI Stuff card: one hero phone with the moments that make Finwise work
// floating around it — a payment detected, one tap to categorise, and Undo.
export function FinwiseThumb() {
  return (
    <div className="fwt" aria-hidden>
      <div className="fwt-glow" />
      <Phone thin className="fwt-phone">
        <HomeScreen />
      </Phone>

      <div className="fwt-note">
        <span className="fwt-app">₹</span>
        <div>
          <small>Finwise · now</small>
          <b>Payment detected</b>
          <span>Swiggy · ₹534 · from email</span>
        </div>
      </div>

      <div className="fwt-chips">
        <small>Add to</small>
        <span className="on"><i style={{ background: "#E07B39" }} />Food</span>
        <span><i style={{ background: "#A5667E" }} />Groceries</span>
        <span><i style={{ background: "#4A4A9C" }} />Travel</span>
      </div>

      <div className="fwt-toast">
        Added ₹534 to Food <b>Undo</b>
      </div>
    </div>
  );
}

export function FinwiseShowcase() {
  return (
    <div className="cs-showcase" aria-hidden>
      <Phone className="left" tilt={-6}>
        <DashboardScreen />
      </Phone>
      <Phone className="mid">
        <HomeScreen />
      </Phone>
      <Phone className="right" tilt={6}>
        <ConfirmScreen />
      </Phone>
    </div>
  );
}

export default function FinwiseCase() {
  return (
    <div className="cs">
      {/* ---------- Key highlights ---------- */}
      <section className="cs-sec">
        <Label>Key Highlights</Label>
        <p className="cs-lead">
          Finwise is a personal money tracker for people who pay with <strong>UPI and cards in India</strong>. It reads the
          payment alerts your bank already sends, by SMS or email, and turns each one into a <strong>ready-to-confirm
          expense</strong>.
        </p>
        <p className="cs-lead">
          I designed it end to end and built it myself with AI as my pair, as a native Android app. The goal was simple:
          make tracking money something you <strong>barely have to do</strong>.
        </p>
        <ol className="cs-pillars">
          <li><span>1.</span> Effortless capture</li>
          <li><span>2.</span> Never lose a rupee</li>
          <li><span>3.</span> Private by default</li>
        </ol>
        <div className="cs-meta">
          <div>
            <small>Team</small>
            <p>Madhav, Product Designer<br />+ AI as a coding partner</p>
          </div>
          <div>
            <small>My Role</small>
            <p>Product Strategy, Interaction Design,<br />Visual Design, Building &amp; Testing</p>
          </div>
          <div>
            <small>Platform</small>
            <p>Android (React Native · Expo)<br />Offline, on-device</p>
          </div>
        </div>
      </section>

      {/* ---------- Problem space ---------- */}
      <section className="cs-sec tint">
        <Label>Problem Space</Label>
        <h3>Why do expense trackers get abandoned?</h3>
        <p>
          Almost everyone who has tried to track their spending has the same story: a strong first week, a few missed
          days, and an app quietly forgotten. The tracking itself was never the hard part — <strong>remembering to
          log every payment</strong> was.
        </p>
        <ul className="cs-list">
          <li><strong>Logging is a chore.</strong> A ₹20 chai, a ₹534 Swiggy order, a fuel top-up — each one needs you to stop and type.</li>
          <li><strong>The data already exists.</strong> Every UPI or card payment already sends an SMS or an email. It just sits in the inbox.</li>
          <li><strong>Totals lie quietly.</strong> Pay a credit-card bill and most trackers count the same money twice: once when you spent it, again when you paid the card.</li>
          <li><strong>Mistakes feel permanent.</strong> One wrong tap and a payment disappears or lands in the wrong place, and trust in the numbers is gone.</li>
        </ul>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section className="cs-sec">
        <Label>Who is it for?</Label>
        <p className="cs-quote">“I want to know where my money goes — I just don’t want to write it all down.”</p>
        <div className="cs-tags">
          <span>Pays mostly by UPI &amp; cards</span>
          <span>Gets a bank SMS or email for every debit</span>
          <span>Spends on small, frequent things</span>
          <span>Has tried a tracker before and dropped it</span>
          <span>Doesn’t want to link a bank account</span>
          <span>Wants a monthly budget, not an accounting tool</span>
        </div>
      </section>

      {/* ---------- Identifying gaps → insights ---------- */}
      <section className="cs-sec tint">
        <Label>Identifying Gaps</Label>
        <p>Looking at how people actually track money — and why they stop — four gaps stood out, and each one became a design principle.</p>
        <div className="cs-grid">
          <div className="cs-insight">
            <b>Capture should be automatic</b>
            <p>If the bank already told you about a payment, the app should already know too. You should only have to confirm, not type.</p>
          </div>
          <div className="cs-insight">
            <b>Automation needs a human check</b>
            <p>Auto-adding everything creates junk: OTPs, mandate set-ups, failed payments. Every detected payment waits for one tap before it counts.</p>
          </div>
          <div className="cs-insight">
            <b>Every action must be undoable</b>
            <p>Confirm, dismiss, delete, recategorise — each comes with Undo. Dismissed payments can always be brought back. Nothing is ever lost.</p>
          </div>
          <div className="cs-insight">
            <b>Money data stays with you</b>
            <p>No accounts, no bank linking, no uploads. The database lives on the phone, with a CSV export and a backup file you own.</p>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="cs-sec">
        <Label>How It Works</Label>
        <p>Every detection source goes through one pipeline, so a payment is understood the same way wherever it came from.</p>
        <div className="cs-flow">
          <div><small>1</small><b>Bank SMS or debit email</b><span>Read when you tap Refresh — or caught the moment it arrives</span></div>
          <i>→</i>
          <div><small>2</small><b>Understand it</b><span>Amount, payee, account and reference pulled from the message</span></div>
          <i>→</i>
          <div><small>3</small><b>De-duplicate</b><span>The same payment reported by SMS, email and receipt is counted once</span></div>
          <i>→</i>
          <div><small>4</small><b>Guess the category</b><span>What you chose last time for this payee, then smart keywords</span></div>
          <i>→</i>
          <div><small>5</small><b>You confirm</b><span>One tap on a category — with Undo</span></div>
        </div>
      </section>

      {/* ---------- Structuring the app ---------- */}
      <section className="cs-sec tint">
        <Label>Structuring The App</Label>
        <p>Three tabs, each answering one question: <em>what just happened</em>, <em>where is my money going</em>, and <em>how should it behave</em>.</p>
        <div className="cs-ia">
          <div>
            <b>Home</b>
            <span>This month’s spending vs budget</span>
            <span>Today so far</span>
            <span>New payments to review</span>
            <span>Quick add (most-used categories)</span>
            <span>Activity, grouped by day</span>
          </div>
          <div>
            <b>Dashboard</b>
            <span>Week · Month · Year</span>
            <span>Spending trend</span>
            <span>Average per day, payment count</span>
            <span>Top spending vs category limits</span>
            <span>Tap a category → its payments</span>
          </div>
          <div>
            <b>Settings</b>
            <span>Monthly &amp; category budgets</span>
            <span>Scan my messages · Gmail</span>
            <span>Don’t count card bills</span>
            <span>Dismissed payments</span>
            <span>Export &amp; backup</span>
          </div>
        </div>
      </section>

      {/* ---------- Final screens ---------- */}
      <section className="cs-sec">
        <Label>Final Screens</Label>

        <div className="cs-screen">
          <Phone><HomeScreen /></Phone>
          <div>
            <h3>Home: what just happened</h3>
            <p>The month’s spending sits on top in a dark card, against your budget and last month. Below it, <strong>New payments</strong> lists what the app found in your messages.</p>
            <ul className="cs-list small">
              <li>Each payment shows the payee, amount, time and where it came from (SMS or Email).</li>
              <li>The guessed category comes first and is outlined; the rest follow, most-used first.</li>
              <li>Only two are shown, with “View more”, so the rest of Home stays close to the top.</li>
              <li>✕ marks it “not a payment” — with Undo.</li>
            </ul>
          </div>
        </div>

        <div className="cs-screen flip">
          <Phone><ConfirmScreen /></Phone>
          <div>
            <h3>Confirm before it counts</h3>
            <p>Tapping a category doesn’t add the payment straight away. A short sheet asks <strong>“Add this expense?”</strong>, so one stray tap never makes a payment disappear.</p>
            <ul className="cs-list small">
              <li>The category can still be changed, and the payee and a note edited.</li>
              <li>Next time you pay the same payee, your choice is remembered and guessed first.</li>
              <li>After adding, a toast says “Added ₹534 to Food” with an Undo button.</li>
            </ul>
          </div>
        </div>

        <div className="cs-screen">
          <Phone><DashboardScreen /></Phone>
          <div>
            <h3>Dashboard: where it’s going</h3>
            <p>Week, Month and Year views with a spending trend and the categories that took the most.</p>
            <ul className="cs-list small">
              <li>Averages only cover the part of the period that has already happened, so day 3 doesn’t look like a crisis.</li>
              <li>Category limits show “of ₹6,000” and turn red with “over” when crossed.</li>
              <li>Tiny categories share one neutral “others” slice instead of overlapping dots.</li>
              <li>Tapping a category opens exactly those payments, already filtered.</li>
            </ul>
          </div>
        </div>

        <div className="cs-screen flip">
          <Phone><AddScreen /></Phone>
          <div>
            <h3>Adding by hand, in seconds</h3>
            <p>For cash and anything the bank didn’t report. The amount is the hero, with − and + to nudge it.</p>
            <ul className="cs-list small">
              <li>The seven most-used categories are always within reach; “Other…” opens the rest.</li>
              <li>Typing “pet food” or “fule” finds “Pet” or “Fuel” instead of creating near-duplicates.</li>
              <li>Today and Yesterday are one tap; older dates are a picker away.</li>
            </ul>
          </div>
        </div>

        <div className="cs-screen">
          <Phone><PrivacyScreen /></Phone>
          <div>
            <h3>Settings that build trust</h3>
            <p>Settings explain what the app does with your data in plain words — and what it doesn’t.</p>
            <ul className="cs-list small">
              <li>Message scanning runs only when you tap it. Nothing runs in the background unless you turn it on.</li>
              <li>“Don’t count card bill payments” keeps card bills out of totals, so money isn’t counted twice.</li>
              <li>“Your data stays on this device. Nothing is uploaded. There are no accounts.”</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Edge cases ---------- */}
      <section className="cs-sec tint">
        <Label>The Details That Matter</Label>
        <p>Bank messages are messy. Most of the craft went into the cases nobody notices — until they go wrong.</p>
        <div className="cs-grid three">
          <div className="cs-insight"><b>Not every “debit” is a payment</b><p>OTPs, failed or reversed payments and AutoPay set-up messages are ignored — but a SIP actually debited through AutoPay still counts.</p></div>
          <div className="cs-insight"><b>One payment, many messages</b><p>A bank SMS, a bank email and a merchant receipt for the same payment are matched by reference and counted once.</p></div>
          <div className="cs-insight"><b>Emails are stricter</b><p>Newsletters and receipts are far more common in email, so email detection needs more proof than SMS before suggesting anything.</p></div>
          <div className="cs-insight"><b>Smart, not magic, categories</b><p>“Sharma Tea Stall” matches Food, but “Steakhouse” doesn’t match “tea”. “CRED” is a bill, “Credit Union” isn’t.</p></div>
          <div className="cs-insight"><b>Safe exports</b><p>A payee named like a spreadsheet formula can’t run code when your CSV is opened in Excel or Google Sheets.</p></div>
          <div className="cs-insight"><b>Backups you can trust</b><p>A backup file is fully checked before restoring, and errors are explained in plain words.</p></div>
        </div>
      </section>

      {/* ---------- Building it ---------- */}
      <section className="cs-sec">
        <Label>Designing By Building</Label>
        <p>
          Instead of handing off static screens, I built Finwise myself with AI as a coding partner. That changed how I
          designed: I could test an interaction on my own phone within minutes, with my own real bank messages.
        </p>
        <div className="cs-stats">
          <div><strong>79</strong><span>automated tests across 8 suites</span></div>
          <div><strong>2</strong><span>detection sources: SMS &amp; Gmail</span></div>
          <div><strong>0</strong><span>accounts or uploads needed</span></div>
        </div>
        <p>
          The message parser is written as plain, testable functions, so the same code runs in the app, in the background
          task that catches SMS while the app is closed, and in the tests that guard every edge case above.
        </p>
      </section>

      {/* ---------- Reflection ---------- */}
      <section className="cs-sec tint">
        <Label>What I Learned</Label>
        <ul className="cs-list">
          <li><strong>Automation earns trust only when it’s reversible.</strong> Undo did more for confidence than any accuracy number could.</li>
          <li><strong>The best input is no input.</strong> The most effective “form” in the app is a single tap on a category chip.</li>
          <li><strong>Building is designing.</strong> Using it every day with real messages surfaced problems no mockup would have.</li>
        </ul>
      </section>
    </div>
  );
}
