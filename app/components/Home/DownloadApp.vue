<script setup lang="ts">
withDefaults(defineProps<{
  downloadButton?: string
}>(), {
  downloadButton: 'Download',
})

import { type OS, stores } from '~/site'

const currentOs = ref<OSInfo | null>(null)

const availableOs = computed<OSInfo[]>(() => {
  const result = []
  for (const storeOs in stores) {
    result.push(extendedStoreInfo(storeOs as OS))
  }
  return result
})

type OSInfo = ReturnType<typeof extendedStoreInfo>

const extendedStoreInfo = (os: OS) => {
  let target = 'Unknown'
  let emoji = ''
  switch (os) {
    case 'android':
      target = 'Android'
      emoji = '🤖'
      break
    case 'darwin':
      target = 'iOS / macOS'
      emoji = '🍎'
      break
    case 'windows':
      target = 'Windows'
      emoji = '🪟'
      break
    case 'linux':
      target = 'Linux'
      emoji = '🐧'
      break
  }
  return {
    id: os,
    stores: stores[os],
    target,
    emoji,
  }
}

onMounted(() => {
  const clientStrings: Record<OS, RegExp> = {
    windows: /(Windows 10.0|Windows NT 10.0|Windows 8.1|Windows NT 6.3|Windows 8|Windows NT 6.2|Windows 7|Windows NT 6.1|Windows Vista|Windows NT 6.0|Windows Server 2003|Windows NT 5.2|Windows NT 5.1|Windows XP|Windows NT 5.0|Windows 2000|Win 9x 4.90|Windows ME|Windows 98|Win98|Windows 95|Win95|Windows_95|Windows NT 4.0|WinNT4.0|WinNT|Windows CE|Win16|OS\/2)/,
    android: /Android/,
    darwin: /(iPhone|iPad|iPod|Macintosh|Mac OS X|Mac OS|MacPPC|MacIntel|Mac_PowerPC)/,
    linux: /(Linux|X11(?!.*CrOS)|OpenBSD|SunOS|CrOS|QNX|UNIX|BeOS)/,
  }
  for (const os in clientStrings) {
    const regex = clientStrings[os as OS]
    if (regex.test(navigator.userAgent)) {
      currentOs.value = extendedStoreInfo(os as OS)
      break
    }
  }
})
</script>

<template>
  <b-row>
    <b-col
      sm="12"
      md="7"
    >
      <slot />
      <div
        v-if="currentOs"
        class="d-flex flex-wrap gap-2"
      >
        <b-button
          v-for="store in currentOs.stores"
          :key="`button-${store.id}`"
          variant="primary"
          :href="store.url"
          :disabled="!store.url"
        >
          <icon
            name="heroicons:arrow-down-tray"
            class="h-6 w-6"
          /> {{ store.name }}
        </b-button>
      </div>
      <div v-else>
        <b-button
          variant="primary"
          disabled
        >
          <icon
            name="heroicons:arrow-down-tray"
            class="h-6 w-6"
          /> {{ downloadButton }}
        </b-button>
      </div>
    </b-col>
    <b-col
      sm="12"
      md="5"
      class="mt-3 mt-lg-0 d-flex flex-column justify-content-center gap-2"
    >
      <b-button
        v-for="os in availableOs"
        :key="`button-${os.id}`"
        :variant="os.id === currentOs?.id ? 'primary' : 'secondary'"
        class="border w-100"
        @click="currentOs = os"
      >
        {{ os.emoji }} {{ os.target }}
      </b-button>
    </b-col>
  </b-row>
</template>
