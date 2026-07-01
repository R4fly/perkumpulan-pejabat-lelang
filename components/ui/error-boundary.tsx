"use client"

import { Component, ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="max-w-md text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold text-djkn-800">
              Terjadi Kesalahan
            </h2>
            <p className="text-djkn-600">
              Maaf, terjadi masalah saat memuat konten. Silakan coba lagi.
            </p>
            {this.state.error && (
              <details className="text-left text-sm text-djkn-500 bg-djkn-50 p-4 rounded-lg">
                <summary className="cursor-pointer font-semibold mb-2">
                  Detail Error
                </summary>
                <pre className="whitespace-pre-wrap break-words">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button
              onClick={this.handleReset}
              className="bg-djkn-700 hover:bg-djkn-800"
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}