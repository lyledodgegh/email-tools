"use strict";
// Email Tools Application
class EmailTools {
    constructor() {
        this.inputTextarea = document.getElementById('input-text');
        this.outputTextarea = document.getElementById('output-text');
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        // Email extraction buttons
        document.getElementById('btn-emails-newline')?.addEventListener('click', () => this.extractEmails('\n'));
        document.getElementById('btn-emails-comma')?.addEventListener('click', () => this.extractEmails(', '));
        document.getElementById('btn-emails-semicolon')?.addEventListener('click', () => this.extractEmails('; '));
        // Username extraction buttons
        document.getElementById('btn-usernames-newline')?.addEventListener('click', () => this.extractUsernames('\n'));
        document.getElementById('btn-usernames-comma')?.addEventListener('click', () => this.extractUsernames(', '));
        document.getElementById('btn-usernames-semicolon')?.addEventListener('click', () => this.extractUsernames('; '));
        // Chat URL buttons
        document.getElementById('btn-teams-url')?.addEventListener('click', () => this.generateTeamsUrl());
        document.getElementById('btn-slack-url')?.addEventListener('click', () => this.generateSlackUrl());
        document.getElementById('btn-google-url')?.addEventListener('click', () => this.generateGoogleUrl());
        // Utility buttons
        document.getElementById('btn-sort')?.addEventListener('click', () => this.sortOutput());
        document.getElementById('btn-copy')?.addEventListener('click', () => this.copyOutput());
    }
    getInput() {
        return this.inputTextarea.value;
    }
    setOutput(text) {
        this.outputTextarea.value = text;
    }
    /**
     * Extract email addresses from input text.
     * Handles formats like:
     * - Plain emails: test@example.com
     * - With friendly names: "John Doe" <john@example.com>
     * - Comma or semicolon separated
     */
    extractEmails(separator) {
        const input = this.getInput();
        // Regex to match email addresses (including those in angle brackets)
        const emailRegex = /<?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>?/g;
        const emails = [];
        let match;
        while ((match = emailRegex.exec(input)) !== null) {
            emails.push(match[1]);
        }
        this.setOutput(emails.join(separator));
    }
    /**
     * Extract just the username part (before @) from email addresses.
     */
    extractUsernames(separator) {
        const input = this.getInput();
        // Regex to match email addresses and capture the username part
        const emailRegex = /<?([a-zA-Z0-9._%+-]+)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}>?/g;
        const usernames = [];
        let match;
        while ((match = emailRegex.exec(input)) !== null) {
            usernames.push(match[1]);
        }
        this.setOutput(usernames.join(separator));
    }
    /**
     * Generate Microsoft Teams chat URL from emails.
     * Format: https://teams.microsoft.com/l/chat/0/0?users=<email1>,<email2>,<email3>
     */
    generateTeamsUrl() {
        const emails = this.getEmailsFromInput();
        if (emails.length === 0) {
            this.setOutput('No emails found in input');
            return;
        }
        const url = `https://teams.microsoft.com/l/chat/0/0?users=${emails.join(',')}`;
        this.setOutput(url);
    }
    /**
     * Generate Slack chat URL from emails.
     * Format: https://slack.com/app_redirect?channel=@<email>
     */
    generateSlackUrl() {
        const emails = this.getEmailsFromInput();
        if (emails.length === 0) {
            this.setOutput('No emails found in input');
            return;
        }
        // Slack uses a different URL pattern - for DMs it redirects to user
        const urls = emails.map(email => `https://slack.com/app_redirect?channel=@${email}`);
        this.setOutput(urls.join('\n'));
    }
    /**
     * Generate Google Workspace chat URL from emails.
     * Format: https://mail.google.com/chat/dm/<email>
     */
    generateGoogleUrl() {
        const emails = this.getEmailsFromInput();
        if (emails.length === 0) {
            this.setOutput('No emails found in input');
            return;
        }
        // Google Chat URL for starting a conversation
        const urls = emails.map(email => `https://mail.google.com/chat/dm/${email}`);
        this.setOutput(urls.join('\n'));
    }
    /**
     * Helper to extract emails from input.
     */
    getEmailsFromInput() {
        const input = this.getInput();
        const emailRegex = /<?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>?/g;
        const emails = [];
        let match;
        while ((match = emailRegex.exec(input)) !== null) {
            emails.push(match[1]);
        }
        return emails;
    }
    /**
     * Sort the output alphabetically.
     */
    sortOutput() {
        const output = this.outputTextarea.value;
        if (!output) {
            return;
        }
        const lines = output.split('\n').filter(line => line.trim().length > 0);
        lines.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        this.setOutput(lines.join('\n'));
    }
    /**
     * Copy the output text to clipboard.
     */
    async copyOutput() {
        const output = this.outputTextarea.value;
        if (!output) {
            return;
        }
        try {
            await navigator.clipboard.writeText(output);
            // Visual feedback
            const copyBtn = document.getElementById('btn-copy');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#1e8449';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 1500);
        }
        catch (err) {
            console.error('Failed to copy text:', err);
        }
    }
}
// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EmailTools();
});
//# sourceMappingURL=app.js.map