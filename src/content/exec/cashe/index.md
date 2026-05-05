---
draft: false
name: Cashe
description:
  Personal budgeting app written for Android.
image: ./image.png
repo: https://github.com/emaanr/cashe
created: 2026-02-20T00:00:00
updated: 2026-03-26T00:00:00
tags: [Mobile, Android, Kotlin, Jetpack Compose]
tz: "America/New_York"
---

> Project repo: [cashe](https://github.com/emaanr/cashe).

# Cashe

I'm trying to be better about my spending so I decided to create a personal budgeting Android app since I've always wanted to give Android development a try.

# Concept

The idea is that the user sets a budget, or `cashe`, for `n` amount of days. On the "Accounts" screen, the user adds `account`s that they are using for the purchases such as credit cards, or non-credit accounts like checkings accounts or loose cash. The user can add information like `limit`, `dueDate`, `closingDate`, and `lastFour`. These exist mainly for providing extra useful information for the user at a glance such as how much of the credit limit has been utilized, the due date and closing date of the card if applicable, and the last four digits of the account to distinguish between credit cards if the user has more than one of a particular credit card.

There will be a bar whose full length represents the budget amount. As the user adds purchases the bar fills up with the purchases so the user can visually see what amount of their budget they have utilized. Each `account` has a `color` associated with it so the bar items are color-coded as well.

When the user hits the "Pay" button on any purchase, it subtracts the amount from the `cashe` budget at the top of "Cashe" screen. This can go into negative. When the `cashe` goes into negative, the bar gets a second page where all overflow purchases are red in color to quickly signal the negative balance and negative balance purchases.

There will be a "Schedule" feature that allows users to schedule re-fills to the `cashe` on a particular date.

There will also be a "Memory" screen that functions the same as the "Cashe" screen except it swaps out today's date for a date range picker, and the "Schedule" gets swapped out for a Search & Filter feature. This page is supposed to serve as a ledger of sorts to review spending over set time frames.

# To Be Continued...

I stopped development on this to focus on embedded learning but I plan to get back to this as soon as I can! Trying not to have unfinished projects in 2026. The image on the [exec](https://rana-emaan.com/exec) page is the current state of the app.