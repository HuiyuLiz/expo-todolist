import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  text: string;
  onPress?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  fullWidth?: boolean;
}

export function Button({ text, onPress, variant = 'default', fullWidth = false }: ButtonProps) {
  // Get styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          button: {
            backgroundColor: '#dc2626',
          },
          text: {
            color: '#ffffff',
          },
        };
      case 'outline':
        return {
          button: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#e5e7eb',
          },
          text: {
            color: '#000000',
          },
        };
      case 'secondary':
        return {
          button: {
            backgroundColor: '#e5e7eb',
          },
          text: {
            color: '#000000',
          },
        };
      case 'ghost':
        return {
          button: {
            backgroundColor: 'transparent',
          },
          text: {
            color: '#000000',
          },
        };
      case 'link':
        return {
          button: {
            backgroundColor: 'transparent',
          },
          text: {
            color: '#2563eb',
            textDecorationLine: 'underline' as const,
          },
        };
      default:
        return {
          button: {
            backgroundColor: 'black',
          },
          text: {
            color: '#ffffff',
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variantStyles.button, fullWidth && { width: '100%' }]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, variantStyles.text]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});