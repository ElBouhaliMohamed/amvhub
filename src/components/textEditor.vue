<template>
  <div class="border-2 border-gray-200 rounded-md editor group hover:border-gray-400">
    <editor-content class="editor__content sm:border-b sm:border-gray-400 " :editor="editor" />

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="clearfix menubar">
        <button
          class="ml-1 menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="fas fa-bold"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="fas fa-italic"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <i class="fas fa-strikethrough"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="fas fa-underline"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="fas fa-list-ul"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="fas fa-list-ol"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="fas fa-quote-right"></i>
        </button>

        <button class="menubar__button" @click="commands.undo">
          <i class="fas fa-undo"></i>
        </button>

        <button class="menubar__button" @click="commands.redo">
          <i class="fas fa-redo"></i>
        </button>

        <span class="inline-flex float-right pr-2 rounded-md shadow-sm">
          <button v-if="submitButton" @click="submit" type="button" class="inline-flex items-center px-2.5 py-1 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
            {{submitButtonText}}
          </button>
        </span>
      </div>
    </editor-menu-bar>

  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: `
          <p>
            Tell us your thoughts!
          </p>
        `,
        onUpdate: ({ getHTML }) => {
          // get new content on update
          console.log(getHTML())
          this.$emit('textChanged', getHTML())
        }
      })
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
      this.editor.content = ''
    }
  },
  props: {
    submitButton: Boolean,
    submitButtonText: String
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
