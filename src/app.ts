// Email Formatter Application

class EmailFormatter {
    private inputTextarea: HTMLTextAreaElement;
    private outputTextarea: HTMLTextAreaElement;

    constructor() {
        this.inputTextarea = document.getElementById('input-text') as HTMLTextAreaElement;
        this.outputTextarea = document.getElementById('output-text') as HTMLTextAreaElement;

        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        document.getElementById('btn-extract-emails')?.addEventListener('click', () => this.extractEmails());
        document.getElementById('btn-extract-usernames')?.addEventListener('click', () => this.extractUsernames());
        document.getElementById('btn-one-per-line')?.addEventListener('click', () => this.onePerLine());
        document.getElementById('btn-clear')?.addEventListener('click', () => this.clear());
        document.getElementById('btn-copy')?.addEventListener('click', () => this.copyOutput());
    }

    private getInput(): string {
        return this.inputTextarea.value;
    }

    private setOutput(text: string): void {
        this.outputTextarea.value = text;
    }

    /**
     * Extract email addresses from input text.
     * Handles formats like:
     * - Plain emails: test@example.com
     * - With friendly names: "John Doe" <john@example.com>
     * - Comma or semicolon separated
     */
    private extractEmails(): void {
        const input = this.getInput();
        
        // Regex to match email addresses (including those in angle brackets)
        const emailRegex = /<?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>?/g;
        
        const emails: string[] = [];
        let match: RegExpExecArray | null;
        
        while ((match = emailRegex.exec(input)) !== null) {
            emails.push(match[1]);
        }
        
        this.setOutput(emails.join('\n'));
    }

    /**
     * Extract just the username part (before @) from email addresses.
     */
    private extractUsernames(): void {
        const input = this.getInput();
        
        // Regex to match email addresses and capture the username part
        const emailRegex = /<?([a-zA-Z0-9._%+-]+)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}>?/g;
        
        const usernames: string[] = [];
        let match: RegExpExecArray | null;
        
        while ((match = emailRegex.exec(input)) !== null) {
            usernames.push(match[1]);
        }
        
        this.setOutput(usernames.join('\n'));
    }

    /**
     * Convert comma/semicolon separated emails to one per line.
     */
    private onePerLine(): void {
        const input = this.getInput();
        
        // Split by comma or semicolon, handling optional whitespace
        const parts = input.split(/[,;]\s*/);
        
        // Trim each part and filter out empty strings
        const lines = parts
            .map(part => part.trim())
            .filter(part => part.length > 0);
        
        this.setOutput(lines.join('\n'));
    }

    /**
     * Clear both input and output text areas.
     */
    private clear(): void {
        this.inputTextarea.value = '';
        this.outputTextarea.value = '';
        this.inputTextarea.focus();
    }

    /**
     * Copy the output text to clipboard.
     */
    private async copyOutput(): Promise<void> {
        const output = this.outputTextarea.value;
        
        if (!output) {
            return;
        }

        try {
            await navigator.clipboard.writeText(output);
            
            // Visual feedback
            const copyBtn = document.getElementById('btn-copy') as HTMLButtonElement;
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#1e8449';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 1500);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EmailFormatter();
});
