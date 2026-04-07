<template>
  <div class="terminal">
    <div class="terminal-bar">
      <div class="dot r" />
      <div class="dot y" />
      <div class="dot g" />
    </div>
    <div class="terminal-body">
      <div><span class="t-dim">$</span> <span class="t-green">git clone</span> <span class="t-white">github.com/Skyost/OpenAuthenticator</span></div>
      <div><span class="t-dim">Cloning into 'OpenAuthenticator'...</span></div>
      <div>&nbsp;</div>
      <div><span class="t-dim">$</span> <span class="t-green">flutter pub get</span></div>
      <div><span class="t-dim">Running "flutter pub get" in OpenAuthenticator...</span></div>
      <div><span class="t-green">✓</span> <span class="t-dim">Got dependencies.</span></div>
      <div>&nbsp;</div>
      <div><span class="t-dim">$</span> <span class="t-green">flutter run</span></div>
      <div><span class="t-green">✓</span> <span class="t-dim">Build succeeded in 12.4s</span></div>
      <div><span class="t-green">✓</span> <span class="t-white">Open Authenticator</span> <span class="t-dim">running on your device</span></div>
      <div>&nbsp;</div>
      <div><span class="t-dim">$</span> <span class="cursor" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/bootstrap-mixins';
@import 'assets/animations';

.terminal {
  background-color: var(--bs-secondary);
  overflow: hidden;
  font-family: var(--bs-font-monospace), monospace;

  @include border;
  @include rounded;

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.25rem;
    background-color: var(--bs-tertiary-bg);
    border-bottom: 1px solid var(--bs-border-color);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    &.r {
      background: #ff5f57;
    }

    &.y {
      background: #febc2e;
    }

    &.g {
      background: #28c840;
    }
  }

  .terminal-body {
    padding: 1.5rem;
    font-size: 0.82rem;
    line-height: 2;
  }

  .t-dim {
    color: #4a6357;
  }

  .t-green {
    color: var(--bs-green);
  }

  .t-white {
    color: var(--bs-white);
  }

  .t-muted {
    color: var(--bs-secondary);
  }

  .cursor {
    display: inline-block;
    width: 7px;
    height: 14px;
    background: var(--bs-green);
    vertical-align: middle;

    @include blink;
  }
}
</style>
