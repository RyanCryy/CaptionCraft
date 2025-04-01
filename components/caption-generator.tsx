"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CaptionGenerator() {
  const [keywords, setKeywords] = useState("")
  const [mood, setMood] = useState("casual")
  const [style, setStyle] = useState("funny")
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [remainingCaptions, setRemainingCaptions] = useState(3)
  const [platform, setPlatform] = useState("instagram")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords,
          mood,
          style,
          platform,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to generate caption")
      }

      setCaption(data.caption)
      setHashtags(data.hashtags)
      setRemainingCaptions((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error generating caption:", error)

      // Show aesthetic toast notification instead of alert
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate caption. Please try again.",
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSubmit(new Event("submit") as React.FormEvent)}
            className="border-destructive-foreground text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground"
          >
            Retry
          </Button>
        ),
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    const textToCopy = `${caption}\n\n${hashtags.join(" ")}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)

    // Show success toast
    toast({
      title: "Copied to clipboard",
      description: "Your caption and hashtags have been copied to clipboard.",
      duration: 2000,
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">Caption Generator</TabsTrigger>
          <TabsTrigger value="result" disabled={!caption}>
            Generated Caption
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generator">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (what's your post about?)</Label>
              <Input
                id="keywords"
                placeholder="e.g., beach, sunset, friends, vacation"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mood">Mood</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="excited">Excited</SelectItem>
                    <SelectItem value="reflective">Reflective</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funny">Funny</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="poetic">Poetic</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading || remainingCaptions <= 0}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Caption"
                )}
              </Button>
              {remainingCaptions <= 0 && (
                <p className="mt-2 text-center text-sm text-destructive">
                  You've reached your daily limit. Upgrade for unlimited captions.
                </p>
              )}
              {remainingCaptions > 0 && (
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {remainingCaptions} free captions remaining today
                </p>
              )}
            </div>
          </form>
        </TabsContent>
        <TabsContent value="result">
          {caption && (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Your Caption</h3>
                  <p className="mt-2 whitespace-pre-line">{caption}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Hashtags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hashtags.map((tag, index) => (
                      <div key={index} className="rounded-full bg-muted px-3 py-1 text-sm">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setCaption("")
                    setHashtags([])
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate New
                </Button>
                <Button className="flex-1" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

