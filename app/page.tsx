import { CaptionGenerator } from "@/components/caption-generator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">CaptionCraft</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Generate Viral Captions for
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Instagram & TikTok
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Create engaging captions with AI that boost your social media presence. Get smart hashtags, trending
            challenges, and style options.
          </p>
        </section>

        <div className="mx-auto max-w-3xl rounded-lg border bg-card p-6 shadow-lg">
          <CaptionGenerator />
        </div>

        <section className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold">Pricing Plans</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Free</h3>
              <p className="mb-4 text-3xl font-bold">$0</p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  3 captions per day
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Basic hashtags
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-md">
              <div className="mb-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground w-fit">
                Popular
              </div>
              <h3 className="mb-2 text-xl font-bold">Pro</h3>
              <p className="mb-4 text-3xl font-bold">
                $9.99<span className="text-sm font-normal">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Unlimited captions
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Smart hashtags
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  All caption styles
                </li>
              </ul>
              <Button className="w-full">Subscribe Now</Button>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-md">
              <h3 className="mb-2 text-xl font-bold">Pay-Per-Use</h3>
              <p className="mb-4 text-3xl font-bold">
                $1<span className="text-sm font-normal">/10 captions</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Pay as you go
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  All features included
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  No subscription required
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Buy Credits
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50 py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 CaptionCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

