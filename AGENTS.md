Example #1 - List of Email Addresses one per line, converted to just the part before the domain:

Input:

test.user1@example.com
john.doe@testmail.com
sarah.smith@demo.net
michael.johnson@sample.org
emma.wilson@placeholder.com
david.brown@fakemail.net

Output:

test.user1
john.doe
sarah.smith
michael.johnson
emma.wilson
david.brown

Example #2 - List of Email Addresses all on one line, converted to List of Email Addresses, one per line:

Input:

test.user1@example.com, john.doe@testmail.com, sarah.smith@demo.net, michael.johnson@sample.org, emma.wilson@placeholder.com, david.brown@fakemail.net

Output:

test.user1@example.com
john.doe@testmail.com
sarah.smith@demo.net
michael.johnson@sample.org
emma.wilson@placeholder.com
david.brown@fakemail.net


Example #3 - List of Email Addresses one per line with friendly names, converted to List of Email Addresses one per line:

# This is the most common format when copying from email clients.

Input:

"Test User1" <test.user1@example.com>, "John Doe" <john.doe@testmail.com>, "Sarah Smith" <sarah.smith@demo.net>, "Michael Johnson" <michael.johnson@sample.org>, "Emma Wilson" <emma.wilson@placeholder.com>, "David Brown" <david.brown@fakemail.net>

Output:

test.user1@example.com
john.doe@testmail.com
sarah.smith@demo.net
michael.johnson@sample.org
emma.wilson@placeholder.com
david.brown@fakemail.net

