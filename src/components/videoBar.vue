<template>
  <div class="flex relative items-center justify-center align-center">
    <button
      v-if="horizontal"
      class="absolute pin-l mx-4 z-10 fas fa-chevron-left bg-secondary-100 text-primary-100 rounded-full shadow-lg w-8 h-8 navigation"
      @click="scroll(false)"
    ></button>
    <button
      v-if="horizontal"
      class="absolute pin-r z-10 fas fa-chevron-right bg-secondary-100 text-primary-100 rounded-full shadow-lg w-8 h-8 navigation"
      @click="scroll(true)"
    ></button>

    <button
      v-if="!horizontal"
      class="scrollButton pin-t fas fa-chevron-up "
      @click="scroll(false)"
    ></button>
    <button
      v-if="!horizontal"
      class="scrollButton pin-b fas fa-chevron-down"
      @click="scroll(true)"
    ></button>

    <div
      :class="[{hRecommendations: horizontal},{vRecommendations: !horizontal }]"
      id="suggested"
      v-touch:swipe="handleSwipe"
    >
      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Test</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>

      <div class="videoRecommendation">
        <div class="videoThumbnail">
          <img draggable="false" src="@/assets/thumbnail.png">
        </div>
        <div class="videoTitle">Versteckspiel</div>
      </div>
    </div>
  </div>
</template>

<script>
import TWEEN from "@tweenjs/tween.js";

export default {
  props: {
    horizontal: Boolean // true horizontal and false vertical
  },
  data: function() {
    return {
      pixelPerElementV: 149.5,
      pixelPerElementH: 232,
      itemsPerScroll: 4,
      tweenDuriation: 600
    };
  },
  computed: {
    scrollHorizontalAmount() {
      return this.pixelPerElementH * this.itemsPerScroll;
    },
    scrollVerticalAmount() {
      return this.pixelPerElementV * this.itemsPerScroll;
    }
  },
  methods: {
    handleSwipe(scrollDirection) {
      switch (scrollDirection) {
        case "top":
          this.scroll(true);
          break;
        case "bottom":
          this.scroll(false);
          break;
        case "left":
          this.scroll(false);
          break;
        case "right":
          this.scroll(true);
          break;
      }
    },
    scroll(scrollDirection) {
      // false = left and true = right
      if (this.horizontal) {
        if (scrollDirection) {
          this.tween(
            document.getElementById("suggested").scrollLeft,
            document.getElementById("suggested").scrollLeft + this.scrollHorizontalAmount,
            this.horizontal
          );
        } else {
          this.tween(
            document.getElementById("suggested").scrollLeft,
            document.getElementById("suggested").scrollLeft - this.scrollHorizontalAmount,
            this.horizontal
          );
        }
      } else {
        if (scrollDirection) {
          this.tween(
            document.getElementById("suggested").scrollTop,
            document.getElementById("suggested").scrollTop + this.scrollVerticalAmount,
            this.horizontal
          );
        } else {
          this.tween(
            document.getElementById("suggested").scrollTop,
            document.getElementById("suggested").scrollTop - this.scrollVerticalAmount,
            this.horizontal
          );
        }
      }
    },
    tween(start, end, horizontal) {
      let frameHandler;

      const animate = function(currentTime) {
        TWEEN.update(currentTime);
        frameHandler = requestAnimationFrame(animate);
      };

      const myTween = new TWEEN.Tween({ tweeningValue: start })
        .to({ tweeningValue: end }, this.tweenDuration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .onUpdate(function(object) {
          if(horizontal) {
            document.getElementById("suggested").scrollLeft =
              object.tweeningValue;
          }else{
            document.getElementById("suggested").scrollTop =
              object.tweeningValue;
          }

        })
        .onComplete(() => {
          cancelAnimationFrame(frameHandler);
        })
        .start();

      frameHandler = requestAnimationFrame(animate);
    }
  }
};
</script>

<style lang="scss" scoped>
.hRecommendations {
  @apply flex flex-row overflow-hidden w-full select-none;
}

.vRecommendations {
  @apply flex flex-col overflow-hidden select-none;
  max-height: 745px;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-5px);
  }
  100% {
    transform: translatey(0px);
  }
}

.videoThumbnail {
  @apply .self-center;
  height: 123.5px;
  width: 220px;
  overflow: hidden;

  transition: all 500ms ease-in-out;
}

.videoRecommendation {
  @apply flex flex-col justify-center mr-3;
  max-width: 220px;
}

.videoTitle {
  @apply .flex .pt-2 .tracking-wide .text-secondary-100 .justify-center;
}

.scrollButton {
  @apply absolute mx-4 z-10 bg-secondary-100 text-primary-100 rounded-full shadow-lg w-8 h-8;
  transition: all 0.2s ease-in-out;
  margin: 0;
}

.scrollButton:hover {
  animation: float 2s ease-in-out infinite;
}
</style>
