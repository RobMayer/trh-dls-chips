# TRH's Collection of Chips

You get what you pay for: I make no garauntees

## Naming Convention

-   "1b" means 1 bit. MUX-1b is a 1-bit Multiplexer
-   "1n" means 1 nybble. MUX-1n is a 4-bit Multiplexer that uses 4-bit bus inputs/outputs. This is distinct from MUX-4b which would be a 4-bit Multiplexer with 4 individual bit outputs.
-   "1w" means 1 word (byte). MUX-1w is an 8-bit Multiplexer that uses 8-bit bus inputs/outputs. This is distinct from MUX-8b which would be an 8-bit Multiplexer with 8 individual bit outputs.

-   a "plus" chip is a chip with extended functionality. a "JK Flipflop" has your typical J, K, and ENABLE pins. a "JK+ Flipflop" has an Asynchronous Set and Asynchonous Clear pin as well.
-   the "a" in "aSet" and "aClear" means asynchronous, as in if the chip has an enable pin for its typical inputs, these won't use it, and will set or clear immediately. Throw an AND gate with your clock in front of it (or a SYNC chip for buses) if you want to synchronize it.
-   the "p" in things like "pENABLE" pins mean that it expects a pulse. There may be some state that'll settle on the falling edge (MS Flipflops, amirite?).

## Typescript Scripts

Don't use 'em. Seriously. I have them here for organizing my own chips.
I'm not responsible for any breakages that running these scripts might have on your saves.
