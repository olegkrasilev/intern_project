import { Transform, TransformFnParams } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

/**
 * Sanitize decorator function to clean up HTML content.
 * This function removes all HTML tags and attributes from the provided string,
 * ensuring that only plain text remains. It also trims the resulting string.
 *
 * @returns {PropertyDecorator} A property decorator that applies the sanitization logic
 * to the target value of the property.
 *
 * @example
 * class MyClass {
 *   @Sanitize()
 *   myText: string;
 * }
 *
 * const myInstance = new MyClass();
 * myInstance.myText = "<p>Hello <b>World</b>!</p>";
 * console.log(myInstance.myText);
 * // Output will be: "Hello World!"
 */
export function Sanitize(): PropertyDecorator {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string') {
      return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim();
    }

    if (value === null) {
      return value as null;
    }
  });
}
